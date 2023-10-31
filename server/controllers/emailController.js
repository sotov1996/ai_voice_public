const elevenLabsServices = require("../services/elevenLabsServices")
const emailServices = require("../services/emailServices")

const sendEmail = async (req, res) => {
    try {
        if (!req.body.email) {
          return res.send(400);
        }

        const content = await elevenLabsServices.getTextIntoSpeech(req.body)

        const data = {
            email: req.body.email,
            text: req.body.text,
            content
        }

        await emailServices.sendEmail(data);
        return res.status(200).json({})
      } catch (e) {
        return res.status(500).send(e)
      }
}

module.exports = {
    sendEmail
}