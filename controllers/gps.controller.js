const { db } = require('../shared')
async function saveLocation (req, res) {
  const { boardId, type } = req
  const { lat, lng } = req.body
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Bad request' })
  }
  const data = await db.saveLocation({ lat, lng, boardId, type })
  return res.status(200).json(data)
}

module.exports = {
  saveLocation
}
