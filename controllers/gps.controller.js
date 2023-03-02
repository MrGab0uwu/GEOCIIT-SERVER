const { db } = require('../shared')
const jwt = require('jsonwebtoken')
async function saveLocation(req, res) {
  const { boardId, type } = req
  let { lat, lng } = req.body
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Bad request' })
  }
  lat = parseFloat(lat)
  lng = parseFloat(lng)
  const data = await db.saveLocation({ lat, lng, boardId, type })
  return res.status(200).json(data)
}

async function login(req, res) {
  const { id } = req.params
  const isActivated = await db.isBoardActivated(id)
  if (!isActivated.length) {
    return res.status(403).json({ message: 'Board not activated' })
  }
  const { type } = isActivated.at(0)
  const token = jwt.sign({ id, type }, process.env.SECRET)
  return res.status(200).json({ token })
}

module.exports = {
  saveLocation,
  login
}
