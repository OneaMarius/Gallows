import React, { useContext, useEffect, useState } from 'react'
import TopInfoBar from '../components/GameLayout/TopInfoBar';
import GameControllers from '../components/GameLayout/GameControllers';
import Card from '../components/Cards/Card';
import WordWindow from '../components/GameLayout/WordWindow';
import HangedMan from '../components/GameLayout/HangedMan';
import AuthContext from '../context/auth-context';
import mod from './GamePage.module.css';
import winSound from '../sounds/win.wav'
import loseSound from '../sounds/lose2.wav'


function GamePage() {
    const authCtx = useContext(AuthContext);
    const user = authCtx.user;
    const [word, setWord] = useState('');
    const [score, setScore] = useState(user.score);
    const [winGame, setWinGame] = useState(user.win);
    const [loseGame, setLoseGame] = useState(user.lose);
    const [finishGame, setFinishGame] = useState(true);
    const [errors, setErrors] = useState(0);
    const [wordDB, setWordDB] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [usedLetters, setUsedLetters] = useState([]);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wordArray, setWordArray] = useState(['A']);
    let winSoundEffect = new Audio(winSound);
    let loseSoundEffect = new Audio(loseSound);
    let wordArr = [];

    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/words/all`)
         .then((response) => response.json())
         .catch((err) => err.message)
         .then((data) => {
            // console.log(data.wordList);
            setWordDB(()=>{
               let DB = data.wordList;
               let wordDB = DB.map(word => word.word);
               return wordDB;
            })

            setLoading(false);
           
         });
   }, []);

  async  function UpdatePlayerScore (lastScore, win, lose) {
        let responseData;
      try {
         const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/score`,
            {
               method: "PATCH",
               headers: {
                  "Content-type": "application/json",
               },
               body: JSON.stringify({
                userId:user._id,
                userScore:lastScore,
                win:win,
                lose:lose
               }),
            }
         );
         responseData = await response.json();
         if (!response.ok) {
            throw new Error(responseData.message);
         } else {
            // console.log(responseData);
            authCtx.updateUser(responseData)
         }
      } catch (error) {
         console.log(error.message);
      }
    }
  
    function keyPress(key) {
    //   console.log('Play press: ', key);
      setWord(key);
      if (key !== ' ' && !wordArray.find(letter => letter.toUpperCase() === key.toUpperCase()) && !usedLetters.find(letter => letter.toUpperCase() === key.toUpperCase())) {
         setUsedLetters(prev => [...prev, key.toUpperCase()])
      } else if (key !== ' ' && wordArray.find(letter => letter.toUpperCase() === key.toUpperCase())) {
         setCorrectLetters(prev => [...prev, key.toUpperCase()])
      }
      
      // console.log(usedLetters);
    }
   function win() {
      winSoundEffect.play();
    setScore(prev => +prev + (5-errors)*100);
    setWinGame(prev => +prev + 1);
    setLoseGame(prev => +prev - 1);
    setFinishGame(true);
    UpdatePlayerScore(+score + (5-errors)*100, +winGame + 1,+loseGame - 1);
    setUsedLetters([]);
    setCorrectLetters([]);
   }

   function lost() {
      loseSoundEffect.play();
      setFinishGame(true);
      setUsedLetters([]);
      setCorrectLetters([]);
   }

   function gameStart(myWord) {
      if (score < 100) {
         setScore(0)
         UpdatePlayerScore(0, winGame, +loseGame + 1);
       } else {
         setScore(prev => prev - 100);
         UpdatePlayerScore(+score - 100, winGame, +loseGame + 1);
       }
       setLoseGame(prev => +prev + 1);
       for (let i = 0; i < myWord.length; i++) {
         wordArr.push(myWord[i].toUpperCase());
       }
       setWordArray(wordArr);
       setCorrectLetters([wordArr[0],wordArr[wordArr.length - 1]]);
   }
  
   function TryNewWord() {
      setFinishGame(false);
    setErrors(0);
   }
    
  
   function addError(nr) {
     setErrors(nr);
   }

  return (
    <Card className={mod.GameCard}>
       {!loading && <div className={mod.loginDiv}><TopInfoBar getScore={score} getWins={winGame} getLosses={loseGame}></TopInfoBar>
       <HangedMan errors={errors} usedLetters = {usedLetters}></HangedMan>
       <WordWindow DB={wordDB} newWord={word} win={win} lost={lost}  gameStart={gameStart}  newGame={winGame} addError={addError}></WordWindow> 
       <GameControllers keyPress={keyPress} gameWon={finishGame} TryNewWord={TryNewWord} usedLetters={usedLetters} correctLetters={correctLetters}></GameControllers></div>}      
     </Card>
  )
}

export default GamePage