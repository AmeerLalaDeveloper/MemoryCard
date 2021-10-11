const submit=document.querySelector('#submit');
const numbers=[3,4,5,6,8,10]
const rand=Math.floor(Math.random()*4+0)
const catURL=`https://api.thecatapi.com/v1/images/search`
const dogURL=`https://dog.ceo/api/breeds/image/random`
const select=document.querySelector('select');
console.log(numbers[rand]);
async function callAPI(){
   
    let val=select.value;
     let arr=[];
    if(localStorage.length==0){
     let request={};
    if(val=='dog'){
    for(let i=0;i<numbers[rand];i++){
        request=await ((await fetch(dogURL)).json())
            arr.push({url:request.message});
    }
    }
     if(val=='cat'){
        for(let i=0;i<numbers[rand];i++){
            request=await (await fetch(catURL)).json();
            arr.push({url:request[0].url});
        }
        }
     window.localStorage.setItem('data',JSON.stringify(arr))
 
}
}
window.onload=async ()=>{
    localStorage.clear()
await callAPI()
}
submit.addEventListener('click',async function(e){
    e.preventDefault()
    await callAPI()
    setTimeout(function(){
        window.location.href='app.html'
    },1000)
   
});
