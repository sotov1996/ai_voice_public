const express = require('express');
const router = express.Router();
const { TextIntoSpeech, getVoices } =  require("../controllers/elevenLabsController")

router.post("/text-into-speech", TextIntoSpeech)
router.get("/voices", getVoices)

module.exports = router;