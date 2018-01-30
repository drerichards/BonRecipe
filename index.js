'use strict'
require('dotenv').config() //loads environment variables from a .env file into process.env
const express = require('express'),
    cors = require('cors'), 
    app = express(),
    bodyParser = require('body-parser'), //parse incoming request bodies in a middleware before the handlers
    { DATABASE_URL, PORT, COOKIE_KEY } = require('./config')

app.use(cors()) //enable all CORS requests from browsers to other domains than the host
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //allow any origin to request the resource
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') //indicattes which headers can be used in the actual request
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') //tells which HTTP methods are enabled for CORS requests
    next() //move on to next middleware in stack if present
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports = { app }
