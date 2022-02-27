const express = require("express");

const wordController = require("../controllers/word-controller");

const router = express.Router();


router.get("/all", wordController.getWordsDB);
router.post("/", wordController.addNewWord);
router.post("/array", wordController.addWords);




module.exports = router;
