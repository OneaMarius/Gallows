const HttpError = require("../models/http-error");

const Word = require("../models/word-model");

async function getWordsDB(req, res, next) {
   let wordList;
   try {
      wordList = await Word.find();
   } catch (error) {
      return next(new HttpError("Something went wrong", 500));
   }
   if (wordList.length === 0) {
      return next(new HttpError("No users found in database", 404));
   }
   res.json({
      wordList: wordList.map((word) => word.toObject({ getters: true })),
   });
}

async function addNewWord(req, res, next) {
   const { word } = req.body;

   const newWord = new Word({
      word,
      length: word.length,
   });

   try {
      await newWord.save();
   } catch (error) {
      return next(new HttpError("Something went wrong prod", 500));
   }
   console.log("new word added: ", newWord.word);
   res.status(201).json(newWord);
}

async function addWords(req, res, next) {
   const { words } = req.body;
   console.log(words);
   words.forEach(async word => {
      const newWord = new Word({
         word: word,
         length: word.length,
      });
      await newWord.save();
      console.log("new word added: ", newWord.word);
   });
  

   res.status(201).json('Array of words added');
}

module.exports = {
   getWordsDB,
   addNewWord,
   addWords
};
