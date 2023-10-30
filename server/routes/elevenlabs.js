const express = require('express');
const router = express.Router();
const { TextIntoSpeech } =  require("../controllers/elevenLabsController")

router.post("/text-into-speetch", TextIntoSpeech)

module.exports = router;