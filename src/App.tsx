import React from 'react';
import {useEffect, useState } from 'react';
import Clue from './components/Clue';
import './App.css'
import possibleAnswers from "./answers.json"

function App() {
  const[guess, setGuess] = useState("")
  const[guessNumber,setGuessNumber]=useState(20)
  const[guessTable, setGuessTable] = useState([{
    "name":"",
    "score":null,
    "startYear":null,
    "studios":""



}])
  useEffect(() => {
    const answerNumber = Math.floor(Math.random() * 10)
    const answer = possibleAnswers[answerNumber]
    console.log("The random number is %d, and the anime is , %s", answerNumber,answer["name"])
    },[]);


  return (
    <div>
        <button onClick={handleGuess}>
        info
        </button>
        <h1>Enter your guess here
        </h1>
        <div>
        <label>Guess</label><br/>
        <input type="text" placeholder ="Please enter your guess" id="anime_name" name="anime_name" onChange={e => setGuess(e.target.value)}/>
        <button onClick={handleGuess}>
        Guess
        </button>
      </div>
      <Clue text = {guess} guessNumber = {guessNumber} />
      <div className =  "app-container">
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Start Year</th>
            <th>Studio</th>
            </tr>
          </thead>
          <tbody>
            {guessTable.map((anime)=>
            <tr>
              <td>{anime.name}</td>
              <td>{anime.score}</td>
              <td>{anime.startYear}</td>
              <td>{anime.studios}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
  function handleGuess(){
    setGuessNumber(guessNumber => guessNumber - 1);
    const newGuess = {
      name: guess,
      score:null,
      startYear:null,
      studios:'',
    };
    const newGuesses = [...guessTable,newGuess]
    setGuessTable(newGuesses);


  }
}


export default App;
