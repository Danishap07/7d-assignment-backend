const fs = require("fs");
const OpenAI = require("openai");
const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI({API_KEY});

async function speechToText(req, res) {
    // const audioData = req.body.audioData;
    // console.log(req)
    const audioPath = req.file.path;
  
    try {
    //   const response = await axios.post('https://api.openai.com/v1/audio/speech', {
    //     audio: audioData,
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   console.log("res", response.data)

    const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: "whisper-1",
  });

  console.log(transcription.text);
      res.json(transcription.text);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing speech to text');
    }
}

module.exports = speechToText;