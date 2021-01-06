const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const server = express()
const router = express.Router()

server.use(cors())
dotenv.config()

const api_key = process.env.API_KEY
const port = process.env.PORT || 5000

router.get('/api', (req, res) => {
  res.send(api_key)
})

server.use(router)

server.listen(port, () => {
  console.log(api_key)
})