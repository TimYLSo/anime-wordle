import React from "react";
import { useEffect, useState } from "react";
import Clue from "./components/Clue";
import "./App.css";
import possibleAnswers from "./answers.json";
import IconButton from "@mui/material/IconButton";
///import Icon from "@mui/material/Icon";
import axios from "axios";
import { Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  const [answer, setAnswer] = useState<undefined | any>(undefined);
  const [guessInfo, setGuessInfo] = useState<undefined | any>(undefined);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const upArrow = "\u25B2";
  const downArrow = "\u25BC";
  const greenbox = "\u2713";
  const redbox = "\u2716";
  const dash = "-";
  ///const [score,setScore] = useState('');
  ///const [startYear, setStartYear] =  useState('');
  ///const [studio,setStudio] = useState('');
  if (guessNumber === 0) {
    alert("you ran out of guesses. Game over");
  }
  useEffect(() => {
    console.log(guessInfo);
    if (guessInfo !== undefined) {
      console.log("rendering table");
      for (const element of guessInfo) {
        if (element.approved === true && element.studios.length !== 0) {
          console.log(element, "currently on this anime",element.studios.length );
          const name = element.title;
          var score = element.score;
          var year = element.year;
          var studio = element.studios[0].name;
          if (name === answer.name) {
            setCorrectAnswer(true);
            alert("you got the answer correct. Congratulations");
          }
          if (answer.score < score) {
            score = element.score + downArrow;
          } else if (answer.score > score) {
            score = element.score + upArrow;
          } else if (answer.score == score) {
            score = element.score + dash;
          }
          if (element.studios[0].name === answer.studios) {
            studio = studio + greenbox;
          } else if (studio !== answer.studios) {
            studio = studio + redbox;
          }
          if (answer.startYear < year) {
            year = year + downArrow;
          } else if (answer.startYear > year) {
            year = year + upArrow;
          } else if (answer.startYear === year) {
            year = year + dash;
          }
          const newGuess = {
            guessNumber: guessNumber,
            name: name,
            score: score,
            startYear: year,
            studios: studio,
          };
          console.log(newGuess);
          const newGuesses = [newGuess, ...guessTable];
          setGuessTable(newGuesses);
          console.log("rendered table");
          setGuessNumber((guessNumber) => guessNumber - 1);
          break;
        }

      }
      alert("anime not found, please check spelling");
    }
    if (guessInfo === []) {
      alert("anime not found, please check spelling");
    }
  }, [guessInfo, answer]);
  const AnimeApi = "https://api.jikan.moe/v4/anime";
  useEffect(() => {
    const answerNumber = Math.floor(Math.random() * 10);
    setAnswer(possibleAnswers[answerNumber]);
    const ans = possibleAnswers[answerNumber];
    console.log(
      "The random number is %d, and the anime is , %s",
      answerNumber,
      ans["name"]
    );
  }, []);

  return (
    <div
    >

      <div className = "header">
      <h1>Anime Wordle App</h1>
      </div>
      <div>
        <label>Guess</label>
        <br />
        <TextField
          className="text"
          placeholder="Please enter your guess"
          id="guess_input"
          name="anime_name"
          onChange={(e) => setGuess(e.target.value)}
        />
        <Button variant="contained" startIcon = {<SearchIcon/>} onClick={() => {handleGuess();}}> Guess </Button>
      </div>

      <Clue text={guess} guessNumber={guessNumber} />
      <div className="app-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
      <TableRow>
      <TableCell style={{ width: 50 }} align="right">Guess</TableCell>
      <TableCell  align="right">Name</TableCell>
      <TableCell  align="right">Score</TableCell>
      <TableCell  align="right">Start Year</TableCell>
      <TableCell  align="right">Studio</TableCell>
      </TableRow>
            </TableHead>
            <TableBody>
            {guessTable.map((anime) => (
              <TableRow 
              key={anime.name} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align = "center">
                <b>{anime.guessNumber}</b>
              </TableCell> 
              <TableCell align="right">{anime.name}</TableCell>
              <TableCell align="right">{anime.score}</TableCell>
              <TableCell align="right">{anime.startYear}</TableCell>
              <TableCell align="right">{anime.studios}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
      </div>
    </div>
  );

  function handleGuess() {
    if (guess===""){
      alert("please enter a guess")
      return
    }
    getAnime();
  }
  async function getAnime() {
    console.log("Guess number %d is %s", guessNumber, guess);

    await axios
      .get(AnimeApi, {
        params: { q: guess, type: "tv", sort: "asc", aproved: true },
      })
      .then((res) => {
        const response = res.data.data;
        setGuessInfo(response);
        console.log("got response");
        console.log(res);

        console.log(guessInfo);
      });
  }
}

export default App;
