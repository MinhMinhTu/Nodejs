const mongoose = require('mongoose')
const Product = require('../models/product.model')

const productID = Product.find().then((products)=>{
    return products
})
const sessionSchema = new mongoose.Schema({
    card : {
        "productID.id" : Number
    }
})

const Session  = mongoose.model('Session',sessionSchema, 'sessions') //sessions is collection


module.exports = Session