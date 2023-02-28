const jwt = require('jsonwebtoken')
const url = 'http://localhost:3000/gps/location'
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const generateToken = (type) => {
  const payload = {
    id: uuidv4(),
    type
  }
  return jwt.sign(payload, process.env.SECRET)
}

const upload = () => {
  for (let i = 0; i < 100; i++) {
    const types = ['cow', 'horse', 'sheep', 'goat', 'pig']
    const type = types[Math.floor(Math.random() * types.length)]
    const token = generateToken(type)
    const lat = Math.random() * (90 - -90) + -90
    const lng = Math.random() * (180 - -180) + -180
    const data = {
      lat: lat.toString(),
      lng: lng.toString()
    }
    fetch(`${url}/${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })
  }
}
if (require.main === module) {
  upload()
}
module.exports = {
  upload
}
