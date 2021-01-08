const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const axios = require('axios')
const server = express()
const router = express.Router()

server.use(cors())
server.use(express.json({extend: true}))

dotenv.config()

const api_key = process.env.API_KEY
const port = process.env.PORT || 5000

router.get('/:city', async (req, res) => {

  const { city } = req.params

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    .then(response => {
      res.send(response.data)
    })
  
})

server.use(router)

server.listen(port, () => {
  console.log(`Server working on port ${port}`)
})