interface ClueProps{
    text: string;
    guessNumber ?: number;

}
function Clue(props: ClueProps){
    return(
    <div>
        <p>you guessed {props.text}</p>
        <p>guesses left: {props.guessNumber}</p>
        </div>
    )
    
  
     
    
}
export default Clue