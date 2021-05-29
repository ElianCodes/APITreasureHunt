const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 8080

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const errormsg = "You broke the game... Internal Server Error"

// basic welcome page
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

app.get("/api/getcode", async function (req, res) {
    try {
        res.status(200).json({ secretCode: '0216549'})
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.route("/api/decode").post(async function (req, res) {
    try {
        res.status(200).json(req.body.code)
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
}).get(async function (req, res) {
    res.status(404).json({ error: "Sure you're using the right method?"})
}).put(async function (req, res) {
    res.status(404).json({ error: "Sure you're using the right method?"})
}).delete(async function (req, res) {
    res.status(404).json({ error: "Sure you're using the right method?"})
})

app.get("/api/submit", async function (req, res) {
    try {
        res.status(200).json({ secretCode: '0216549'})
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));