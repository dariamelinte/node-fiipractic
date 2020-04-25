const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//create the app instance and configure it 
const app = express()
const router = require('./routes')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

// configure the environment 
const ENV = process.env.NODE_ENV || 'dev'
const config = dotenv.config({
  path: `./config/${ENV}.env`
}).parsed


// connect to database
mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to database'))

const db = require('./models')

app.use((req, res, next) => {
  req.db = db
  next()
})

// app routed
app.use('/', router)

//app running on port
app.listen(config.PORT, () => console.log(`listening on port ${config.PORT}`))