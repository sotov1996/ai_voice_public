const openaiServices = require("../services/openaiServices")

const generateText = async (req, res) => {
    try {
        console.log("req.body",req.body)
        if (!req.body.text) {
          return res.send(400);
        }

        const content = await openaiServices.generateText(req.body.text)

        return res.status(200).json(content)
      } catch (e) {
        return res.status(500).send(e)
      }
}

module.exports = {
    generateText
}