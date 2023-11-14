const elevenLabsServices = require("../services/elevenLabsServices")

const TextIntoSpeech = async (req, res) => {
    try {
        if (!req.body.email) {
          return res.send(400);
        }

        const content = await elevenLabsServices.getTextIntoSpeech(req.body)

        return res.status(200).send(content)
      } catch (e) {
        return res.status(500).send(e)
      }
}

const getVoices = async (req, res) => {
    try {
        const content = await elevenLabsServices.getVoices()

        return res.status(200).json(content)
      } catch (e) {
        return res.status(500).send(e)
      }
}

module.exports = {
    TextIntoSpeech,
    getVoices
}