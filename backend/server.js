const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const server = express()
const router = express.Router()

server.use(cors())
server.use(express.json({extend: true}))

dotenv.config()

const api_key = process.env.API_KEY
const port = process.env.PORT || 5000
var api_key_encrypted

async function createHash() {
    const hash = await bcrypt.hash(api_key, 10)
    api_key_encrypted = hash
}

createHash()

router.get('/api', async (req, res) => {

  const compare_api_key = await bcrypt.compare(api_key, api_key_encrypted)
  
  if(compare_api_key){
    res.send(api_key)
  }
})

server.use(router)

server.listen(port, () => {
  console.log(`Server working on port ${port}`)
})