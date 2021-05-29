const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 8080
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const errormsg = "You broke the game... Internal Server Error"

const mongoose = require('mongoose');

const { Schema } = mongoose;
const pass = "8eGzDaarhChQmcXr"

mongoose.connect(
    "mongodb+srv://elian:8eGzDaarhChQmcXr@trasurehunts.1emy8.mongodb.net/TreasureHunt?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
);

const User = new Schema({
  name:  String, // String is shorthand for {type: String}
  step: Number,
  completedAt: Date
});
const users = mongoose.model("users", User)

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
                msg: "Nice"
            })
        } else {
            res.status(400).json({ msg: "that's just wrong kiddo"})
        }
        
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.post('/api/login', async (req, res) => {
    try {
        if(req.body.name == null){
            res.status(400).json({ msg: "it looks like no name was attached"})
        } else if (req.body.name.trim().length == 0) {
            res.status(400).json({ msg: "You tried to trick me right"})
        } else {
            const user = await users.findOne({ name: req.body.name }).exec();   
            if(user != null) {
                const token = jwt.sign({ name: user.name }, 'smollPP')
                res.status(200).json({ msg: "Username already exists", token: token})
            } else {
                const newUser = await users.create({name: req.body.name, step: 4, completedAt: Date.now()})
                const token = jwt.sign({ name: newUser.name }, 'smollPP')
                res.status(201).json(token)
            }
        }
    } catch (e) {
        if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.get("/api/submit", async function (req, res) {
    try {
        const auth = req.headers.authorization;
        if (auth == null) {
            return res.status(401).json({ msg: "No token, auth denied" });
          }
        const bearer = auth.split(' ');
        const token = bearer[1];
        if (!token) {
          return res.status(401).json({ msg: "No token, auth denied" });
        }
        const decoded = jwt.verify(token, "smollPP", function(err, decoded) {
            if(err) {
                res.status(401).json({ msg: "That does't look like a valid token"})
            } else {
                req.user = decoded.user;
                res.status(200).json({ msg: 'Congrats! You have completed the treasure hunt!'})
            }
        });
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

app.get("/api/completedTwo/:checks", async function (req, res) {
    try {
        if(req.params.checks == 5){
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.get("/api/completedThree/:checks", async function (req, res) {
    try {
        if(req.params.checks == 3){
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