const express = require('express')
const router = express.Router()
const validate = require('../validate/user.validate')

const controller = require('../controllers/user.controller')



router.get('/cookie', (req, res)=>{
    res.cookie('user-id',12345);
    res.send('ok')
})

router.get('/' ,controller.index)

router.get('/search',controller.search)

router.get('/create',controller.create)

router.get('/:userId',controller.get )

router.post('/create',validate.postCreate ,controller.postCreate)


module.exports = router
