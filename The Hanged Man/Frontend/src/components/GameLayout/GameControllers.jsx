import React, { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import clickSound from '../../sounds/click.wav'
import mod from "./Game.module.css";



function GameControllers(props) {
    const [gameWon, setGameWon] = useState(false);
   let lettersArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
   let song = new Audio(clickSound);
   

   function showLetter(e) {
      props.keyPress(e.target.innerText);
      song.play();
   }

   function TryNewWord() {
    props.keyPress(' ');
    setGameWon(false);
    props.TryNewWord();
   }

   

   useEffect(()=>{
    setGameWon(props.gameWon);
   },[props.gameWon])

   return (
      <div className={`${mod.GameControllers} ${gameWon ? mod.GameControllersNewGame : ''}`}>
       {!gameWon && lettersArr.map((element) => {

            return (
               <Button key={Math.random()} onClick={showLetter} className={`${mod.ctrlBtn} ${props.usedLetters.find(letter => letter===element)? mod.ctrBtnRed : ''} ${props.correctLetters.find(letter => letter===element)? mod.ctrBtnGreen : ''}`}>
                  {element}
               </Button>
            );
         })}  
       {gameWon && <Button onClick={TryNewWord}>New Word</Button>}  
  
      </div>
   );
}

export default GameControllers;
