const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.params?.id
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
    }
    req.boardId = decoded.id
    req.type = decoded.type
    next()
  })
}
