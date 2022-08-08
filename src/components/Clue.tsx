interface ClueProps{
    text: string;
    guessNumber ?: number;

}
function Clue(props: ClueProps){
    return(
    <div>
        <p>you guessed {props.text}</p>
        </div>
    )
    
  
     
    
}
export default Clue