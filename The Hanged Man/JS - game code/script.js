let word = document.getElementById("show");
let okBtn = document.getElementById("okBtn");
let inputLetter = document.getElementById("inputLetter");
let myWord = "marius";
let finalWord = "";
let firstLetter = "";
let wordArr = [];
let correctLetter = false;
errorNumber = 0;
okBtn.addEventListener("click", getValue);

for (let index = 0; index < myWord.length; index++) {
   if (index === 0) {
      finalWord = myWord[0].toUpperCase();
      firstLetter = myWord[0].toUpperCase();
   } else {
      if (myWord[index].toUpperCase() === firstLetter.toUpperCase()) {
         finalWord += myWord[index].toUpperCase();
      } else {
         finalWord += "_";
      }
   }
}
console.log(finalWord);

function getValue() {
    correctLetter = false;
   let checkLetter = inputLetter.value;
   inputLetter.value = '';
   for (let i = 0; i < myWord.length; i++) {
      wordArr[i] = finalWord[i];
      if (myWord[i].toUpperCase() === checkLetter.toUpperCase()) {
         wordArr.splice(i, 1, checkLetter.toUpperCase());
         correctLetter = true;
      }
   }
   console.log(wordArr);
   finalWord = "";
   wordArr.forEach((el) => (finalWord += el));
   word.innerText = finalWord;
   if (!correctLetter) {
       errorNumber++;
       console.log(errorNumber);
   }
   if (errorNumber === 5) {
    word.innerText = 'YOU LOST'
   }
   if (wordArr.findIndex(el => el === '_') === -1) {
       console.log("You win");
   }
}

word.innerText = finalWord;
