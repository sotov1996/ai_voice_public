const express = require('express');
const router = express.Router();

router.post("/converts-text-into-speech", async (_, res) => {
    try {
          return res.status(200).send({})
      } catch (e) {
        return res.send(500)
      }
})

module.exports = router;