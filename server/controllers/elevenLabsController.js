const elevenLabsServices = require("../services/elevenLabsServices")

const TextIntoSpeech = async (req, res) => {
    try {
        if (!req.body.email) {
          return res.status(400).send("TextIntoSpeech bad request");
        }

        const content = await elevenLabsServices.getTextIntoSpeech(req.body)

        return res.status(200).send(content)
      } catch (e) {
        return res.status(500).send("TextIntoSpeech error")
      }
}

const getVoices = async (req, res) => {
    try {
        const content = await elevenLabsServices.getVoices()

        return res.status(200).json(content)
      } catch (e) {
        return res.status(500).send("getVoices error")
      }
}

module.exports = {
    TextIntoSpeech,
    getVoices
}