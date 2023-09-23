const express = require('express')
const {connection} = require('./db')
const mongoose = require('mongoose')
const {bookRoute} = require('./routes/bookRoute')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/book', bookRoute)
const port = 8080


app.listen(port, async(req, res)=>{
    try{
        connection
        console.log('Connected to DB')
    }catch(err){
        console.log('Not connected to DB')
    }
    console.log(`Server is runnig at port number ${port}`)
})

