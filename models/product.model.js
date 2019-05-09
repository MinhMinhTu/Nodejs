const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
})

const Product  = mongoose.model('Product',productSchema, 'products') //products is collection


module.exports = Product