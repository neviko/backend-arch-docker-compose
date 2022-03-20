require("dotenv").config()
const defaults = require('./database/defaults')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const queueService = require('./queue.service');
const connectToDB = require('./database/db');
const { getAllBooks } = require('./controllers/api.controller')

// connect to RabbitMQ
queueService.init()

// connect to DB
connectToDB({db:defaults.DB_TYPES.mongo})

// Express setup
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/',async (req,res)=>{
    await queueService.sendMessage({test:"test nevo"})
    res.send("api response")
    
})

app.post('/book',async (req,res)=>{
    console.log(req.body);
    await queueService.sendMessage(req.body)
    res.status = 201
    res.send('book added')
})

app.get('/books',async (req,res)=>{
    const books = await getAllBooks()
    res.send(books)
})

app.listen(5000,()=>{
    console.log('Server is up and running');
})


