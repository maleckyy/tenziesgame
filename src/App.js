import logo from './logo.svg';
import './App.css';
import Die from './comp/Die';
import React from "react";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'


function App() {

  const[dice,setDice] = React.useState(allNewDice())
  
  const[tenzies,setTenzies] = React.useState(false)

  const[rollCount, setRollCount] = React.useState(0)

  React.useEffect(()=>{
    const trueList = dice.filter(item=> item.isHeld)
    
    const finalList = trueList.every((item)=>
      item.value === trueList[0].value
    )
    if(finalList == true && trueList.length == 10){
      setTenzies(true)
    }
  },[dice])

  function generateNewDie(){
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id: nanoid(),
      }
  }

  function allNewDice(){
    const randomNumbersArray = []

     for(let i =0; i <10 ; i++){

      randomNumbersArray.push(generateNewDie())
     }
     return randomNumbersArray
  }

  function holdDice(id){
    
    setDice(
      dice=>dice.map((item)=>{
      return item.id === id ? {...item, isHeld: !item.isHeld} : item}))

  }

  function diceReroll(){
    if(tenzies){
      setRollCount(0)

      setDice(allNewDice())
      setTenzies(false)
    }else{
      setRollCount( count=> count+1)
      setDice(oldDice=> oldDice.map(
        (die)=>{
          return die.isHeld ? die : generateNewDie()
        }
        ))
      }
  }

  const diceElements= dice.map((item)=> (
    <Die 
    key = {item.id}
    id = {item.id} 
    value = {item.value}
    isHeld = {item.isHeld}
    holdDice = {holdDice}
    />))

  return (
    <main>

      <div className='tenzie--box'>
        <div className='tenzie--screen'>
          {tenzies && <Confetti
            className='confetti'
          />}
          <h1>{tenzies ? 'YOU WIN' : 'Tenzies'}</h1>
          <p className="instructions">
          {tenzies ? `in ${rollCount} rolls` : 
          'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'
          }
          </p>
            <div className='dies-cont'>
            {diceElements}

            </div>
          <button onClick={diceReroll}>{tenzies ? 'New Game' : 'Roll'}</button>

        </div>
      </div>
    </main>
  );
}

export default App;
