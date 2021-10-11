
const gameBoard=document.querySelector('.game-board')
const data=JSON.parse(localStorage.getItem('data'));
let URLs=[]
let firstCardValue=0
let secondCardValue=0
let prevCard={}
let currentCard={}
let gameBoardCards=[];
let countClickedCards=0
let correctGuesses=0
let columnCount=0;
let falseGuess=0;

function flipCardsBack(prev,current){

    prev.style.background=''
    current.style.background=''


}
function handleCardClick(){
        
         if(this.style.background==''){
        this.style.background=`url(${URLs[this.getAttribute('data-value')]})`
        ++countClickedCards;
        }
          if(countClickedCards==1){
             firstCardValue=this.getAttribute('data-value')
             prevCard=this;
          }
          else {
          secondCardValue=this.getAttribute('data-value');
          currentCard=this;
          }

        if(countClickedCards==2){
            if(checkPair(firstCardValue,secondCardValue)){
                shutEventListener(firstCardValue)
                correctGuesses+=2;  
                if(correctGuesses==gameBoardCards.length){
                      setTimeout(function(){
                   alert('You Won');
                },1000)
                
                setTimeout(function(){
                    localStorage.clear()
                    window.location.href='index.html'
                },1000)

                }
            }
            else{
                falseGuess++;
                if(falseGuess==3)
                     setTimeout(function(){
                     alert('Noob');
                    window.location.href='index.html'
                },1000)

                
            setTimeout(function(){
                flipCardsBack(prevCard,currentCard);
            },700)
            countClickedCards=0;
        }
        }
        
}

function shutEventListener(val){
    cards.forEach(card=>{


        if(card.getAttribute('data-value')==val)
        card.removeEventListener('click',handleCardClick)

    })

}
function checkPair(val1,val2){
    return val1==val2;

}

function buildURLArray(){
    data.forEach(img=>{
        URLs.push(img.url)
    })
}
function setColumnsNumber(){
    console.log(gameBoardCards.length);
    if(gameBoardCards.length==6)
        return 3;
    if(gameBoardCards.length==8||gameBoardCards.length==12||gameBoardCards.length==16)
        return 4;
    if(gameBoardCards.length==10)
        return 5;
     if(gameBoardCards.length==14)
        return 7   
    if(gameBoardCards.length==20)
            return 5;
}
function styleGrid(){
    let num=setColumnsNumber();
    
   console.log(num);
    gameBoard.style.gridTemplateColumns=`repeat(${setColumnsNumber()},1fr)`

}
const shuffleArray =(array)=>
 array.sort((a, b) => 0.5 - Math.random());

function createCards(){
     
    for(let i=0;i<data.length;i++){
    gameBoardCards.push(`<div class="card flipped" data-value=${i}></ div>`)
    gameBoardCards.push(`<div class="card flipped" data-value=${i}></ div>`)
    }
     gameBoardCards=shuffleArray(gameBoardCards)
    gameBoardCards.forEach(card=>gameBoard.innerHTML+=card)
    styleGrid();
 }
 createCards();
 buildURLArray();
 const cards=document.querySelectorAll('.card')
 cards.forEach(card=>{
    card.addEventListener('click',handleCardClick)
 })


