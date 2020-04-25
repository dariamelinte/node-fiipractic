const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/users', (req, res) => {
  res.status(200).json({
    success: true,
    users: [{
      id: 1,
      email: 'iduas@suia.com'
    }]
  })
})

app.post('/users', (req, res) => {
  res.status(201).json({
    success: true,
    users: req.body
  })  
})

app.listen(8000, () => console.log('App is running on port 3000'))
