const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const axios = require('axios');

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

const getTextIntoSpeech = async ({ text, voice_id, voice_settings }) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`
  const apiRequestOptions = {
    method: 'POST',
    url: url,
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      'xi-api-key': process.env.REACT_APP_X_APY_KEY_ELEVENLABS,
    },
    data: {
      text,
      "model_id": "eleven_multilingual_v2",
      voice_settings
    },
    responseType: 'arraybuffer'
  };

  const apiResponse = await axios.request(apiRequestOptions);
  return apiResponse.data;
}

router.post("/send-email", async (req, res) => {
    try {
        if (!req.body.email) {
          return res.send(400);
        }
        const convert = await getTextIntoSpeech(req.body)
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: 'Please verify your email',
          html: `
            <div>
              ${req.body.text}
            </div>
            `,
            attachments: [{
              filename: "file.mp3",
              content: convert
          }]
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).send({})
      } catch (e) {
        return res.status(500).send(e)
      }
})

module.exports = router;