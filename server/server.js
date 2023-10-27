const express = require("express");
require("dotenv").config()
const cors = require('cors')
const path = require("path")

const stripe = require("./routes/stripe")
const email = require("./routes/email")

const { NODE_PORT } = process.env

const app = express();

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "/../build")))

app.use("/api/stripe", stripe)
app.use("/api/email", email)

app.get("*", (_, res) => {
	res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}`));