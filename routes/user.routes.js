const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest:'./public/uploads/'})

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

router.post('/create',
        upload.single('avatar'),//upload 1 file have name avatar
        validate.postCreate ,   //validate
        controller.postCreate)  


module.exports = router
