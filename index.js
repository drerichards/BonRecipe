'use strict'
require('dotenv').config() //loads environment variables from a .env file into process.env
const express = require('express'),
    cors = require('cors'), 
    app = express(),
    bodyParser = require('body-parser'), //parse incoming request bodies in a middleware before the handlers
    morgan = require('morgan'),
{ DATABASE_URL, PORT, COOKIE_KEY, CLIENT_ORIGIN } = require('./config')

app.use(cors({ origin: CLIENT_ORIGIN})) //enable all CORS requests from either the client or localhost 3000
app.use(morgan('dev')) //output colored by response status for development use
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //allow any origin to request the resource
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') //indicattes which headers can be used in the actual request
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') //tells which HTTP methods are enabled for CORS requests
    next() //move on to next middleware in stack if present
})

//other routes here
const logErrors = (err, req, res, next) => {
    console.error(err.stack)
    return res.status(500).json({ error: 'Something went wrong' })
}

app.use(logErrors)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports = { app }
