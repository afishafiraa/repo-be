const express = require('express')
const app = express()
const port = 3000
const router = require('./router')

// app.get('/', (req, res) => res.status(200).send("Hello world1 2!"))
// app.get('/hello', (req, res) => res.send("Hello!"))

// app.get('', (req, res) => res.status(404).send("Not Found"))
app.use(express.json())

app.use(router);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))