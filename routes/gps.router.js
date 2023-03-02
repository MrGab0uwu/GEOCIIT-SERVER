const router = require('express').Router()
const { auth } = require('../middlewares')
const { gpsController } = require('../controllers')
router.post('/location/:id', auth, gpsController.saveLocation)
router.get('/login/:id', gpsController.login)

module.exports = router
