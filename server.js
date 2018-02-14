'use strict'
require('dotenv').config() //loads environment variables from a .env file into process.env
const express = require('express'),
    cors = require('cors'), 
    app = express(),
    bodyParser = require('body-parser'), //parse incoming request bodies in a middleware before the handlers
    mongoose = require('mongoose'),
    passport = require('passport'),
    morgan = require('morgan'),
{ DATABASE_URL, PORT } = require('./config')
const { router: usersRouter } = require('./users')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //allow any origin to request the resource
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') //indicattes which headers can be used in the actual request
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS') //tells which HTTP methods are enabled for CORS requests
    next() //move on to next middleware in stack if present
})

app.use(morgan('dev')) //output colored by response status for development use
app.use(bodyParser.json())
mongoose.Promise = global.Promise
mongoose.connect(DATABASE_URL)
mongoose.connection.once('open', () => {
    console.log('Mongo Connection Opened!')
}).on('error', (error) => console.warn('Warning ', error))

passport.use(localStrategy)
passport.use(jwtStrategy)

//request to register a new user, with a given UN and PW
//send a JSON request body containing the UN and PW
app.use('/api/users/', usersRouter) 
app.use('/api/auth/', authRouter)

const jwtAuth = passport.authenticate('jwt', { session: false })

require('./routes/apiRecipeRoutes')(app)
require('./routes/crudRoutes')(app)

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' }) //catchall for bad route requests
})

const logErrors = (err, req, res, next) => {
    console.error(err.stack)
    return res.status(500).json({ error: 'Something went wrong' })
}

app.use(logErrors)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports = { app }
