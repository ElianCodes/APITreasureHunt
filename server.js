const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8080

app.use(cors())

const errormsg = "You broke the game... Internal Server Error"

app.get("/api/getcode", async function (req, res) {
    try {
        res.status(200).json({ secretCode: '0216549'})
    } catch (e) {
      if (e) throw e
        res.status(500).send(errormsg)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));