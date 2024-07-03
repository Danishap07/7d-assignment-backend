const express = require('express');
const openAiChatCompletion = require('../controllers/openAIChatController');
// const speechToTextController = require('../controllers/speechToTextController');
const speechToText = require('../controllers/speechToTextController');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });



router.get("/hello", (req, res) => {
    console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY)
    res.status(200).json({message: "API is working!",});

})

router.route('/completion').post(openAiChatCompletion);

router.route('/speech-to-text').post(upload.single('audio'), speechToText)

module.exports = router