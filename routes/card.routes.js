
const express = require('express')
const router = express.Router()

const controller = require('../controllers/card.controller')


router.get('/add/:productId',controller.addToCard)


module.exports = router
