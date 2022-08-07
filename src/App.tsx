import React from 'react';
import { useState } from 'react';
import Clue from './components/Clue';


function App() {
  const[guess, setGuess] = useState("")
  const[guessNumber,setGuessNumber]=useState(20)
  return (
    <div>
        <button onClick={Guess}>
        info
        </button>
        <h1>Enter your guess here
        </h1>
        <div>
        <label>Guess</label><br/>
        <input type="text" id="anime_name" name="anime_name" onChange={e => setGuess(e.target.value)}/>
        <button onClick={Guess}>
        Guess
        </button>
      </div>
      <Clue text = {guess} guessNumber = {guessNumber} />
    </div>

  );
  function Guess(){
    setGuessNumber(guessNumber => guessNumber - 1);
  }
}


export default App;
