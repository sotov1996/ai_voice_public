const openaiServices = require("../services/openaiServices")

const generateText = async (req, res) => {
    try {
        if (!req.body.text) {
          return res.status(400).send("generateText bad request");
        }

        const content = await openaiServices.generateText(req.body)

        return res.status(200).json(content)
      } catch (e) {
        return res.status(500).send("generateText error")
      }
}

module.exports = {
    generateText
}