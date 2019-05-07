
const express = require('express')
const router = express.Router()
const validate = require('../validate/auth.validate')
const controller = require('../controllers/auth.controller')


router.get('/login',controller.login)

router.post('/login', validate.postLogin ,controller.postLogin)


module.exports = router
