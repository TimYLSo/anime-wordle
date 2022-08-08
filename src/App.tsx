import React from "react";
import { useEffect, useState } from "react";
import Clue from "./components/Clue";
import "./App.css";
import possibleAnswers from "./answers.json";
///import Icon from "@mui/material/Icon";
import axios from "axios";

function App() {
  const [guess, setGuess] = useState("");
  const [guessNumber, setGuessNumber] = useState(20);
  const [guessTable, setGuessTable] = useState([
    {
      guessNumber: 0,
      name: "",
      score: "",
      startYear: "",
      studios: "",
    },
  ]);
  const [guessInfo, setGuessInfo] = useState<undefined |any>(
    undefined
  );
  useEffect(() => {
    console.log(guessInfo)
    if(guessInfo !== undefined){
      const newGuess = {
        guessNumber:guessNumber,
        name: guessInfo.title,
        score: guessInfo.score,
        startYear:  guessInfo.year,
        studios: guessInfo.studios[0].name,
      };
      console.log(newGuess)
      if (newGuess === null || newGuess === undefined){
        alert("anime not found");
        return
      }
      const newGuesses = [newGuess, ...guessTable];
      setGuessTable(newGuesses);
      console.log("rendered table");
      setGuessNumber((guessNumber) => guessNumber - 1);

  };
  }, [guessInfo]);
  const AnimeApi = "https://api.jikan.moe/v4/anime";
  useEffect(() => {
    const answerNumber = Math.floor(Math.random() * 10);
    const answer = possibleAnswers[answerNumber];
    console.log(
      "The random number is %d, and the anime is , %s",
      answerNumber,
      answer["name"]
    );
  }, []);

  return (
    <div>
      <button onClick={handleGuess}>info</button>
      <h1>Enter your guess here</h1>
      <div>
        <label>Guess</label>
        <br />
        <input
          type="text"
          placeholder="Please enter your guess"
          id="anime_name"
          name="anime_name"
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>

      <Clue text={guess} guessNumber={guessNumber} />
      <div className="app-container">
        <table>
          <thead>
            <tr>
            <th>guess</th>
              <th>Name</th>
              <th>Score</th>
              <th>Start Year</th>
              <th>Studio</th>
            </tr>
          </thead>
          <tbody>
            {guessTable.map((anime) => (
              <tr>
                <td>{anime.guessNumber}</td>
                <td>{anime.name}</td>
                <td>{anime.score}</td>
                <td>{anime.startYear}</td>
                <td>{anime.studios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleGuess() {

    
    getAnime();
   

  }
  async function getAnime () {
    console.log("Guess number %d is %s", guessNumber, guess);

    await axios
    .get(AnimeApi + "?q=" + guess)
    .then((res) => {
      const response = res.data.data[0]
      setGuessInfo(response);
      console.log("got data");
      console.log(res)

      console.log(guessInfo);}
      )

      

      ;


}

  }


export default App;
