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
        res.status(200).json({
            secretCode: '4765656e546970',
            "Next question": "Decode this code by using the api/decode endpoint",
            tip: "Use the right method"
        })
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.route("/api/decode").post(async function (req, res) {
    try {
        if(req.body.code == "4765656e546970") {
            res.status(200).json({ 
                "next question": "How many deaths does Walter White have in the Breaking Bad television show?",
                "tip": "use the www.breakingbadapi.com API"
            })    
        } else if (req.body.code == null) {
            res.status(400).json({ msg: "did you send the code?"})
        } else if (req.body.code != null)  {
            res.status(400).json({ msg: "That doesn't look like the right code"})
        } else {
            res.status(400).json({ msg: "nope"})
        }
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

app.get("/api/deadcount/walter", async function (req, res) {
    try {
        res.status(200).json({ 
            secretCode: '4765656e546970',
            "Next question": "Decode this code by using the api/decode"
        })
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.get("/api/deadcount/walter/:number", async function (req, res) {
    try {
        if(req.params.number == 198){
            res.status(200).json({ msg: "You're god damn right", "next question": "Use the submit request and send it to see if you've won!"})
        } else if (req.params.number == 200) {
            res.status(400).json({ msg: "Please don't use Google, use the provided API"})
        } else if (req.params.number == 69) {
            res.status(400).json({ 
                msg: "Disapointed"
            })
        } else {
            res.status(400).json({ msg: "that's just wrong kiddo"})
        }
        
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.get("/api/submit", async function (req, res) {
    try {
        res.status(200).json({ secretCode: '0216549'})
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.get("/api/completedOne/:checks", async function (req, res) {
    try {
        if(req.params.checks == 2){
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));