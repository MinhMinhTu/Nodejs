const express = require('express')
const router = express.Router()

const controller = require('../controllers/product.controller')


// router.get('/',controller.product)

router.get('/:apiID',controller.getOneProduct)

router.post('/',controller.postProductApi)

router.delete('/:apiID', controller.deleteProductApi)

router.put('/:apiID',controller.putProductApi)

router.patch('/:apiID',controller.patchProductApi)



module.exports = router
