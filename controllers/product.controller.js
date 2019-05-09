// const db = require('../db')
const Product = require('../models/product.model')


module.exports.product = async (req, res) => {
    let page = parseInt(req.query.page) || 1 //n
    const perPage = 4; //x
    const start = (page - 1) * perPage
    const end = page * perPage

    let gtr = 0
    if (page > 0 && page < 4) {
        gtr = gtr      
    }
    if (page > 3 && page < 7) {
        gtr =  3        
    }
    if (page > 6 && page < 10) {
        gtr = 6
    }
    if (page > 9 && page < 13) {
        gtr = 9  
    }
    if (page > 12 && page < 16) {
        gtr = 12  
    }
    if (page > 15 && page < 19) {
        gtr = 15  
    }
    if (page > 18 && page < 22) {
        gtr = 18  
    }
    if (page > 21 && page < 25) {
        gtr = 21  
    }
    if(page > 25){
        res.render('products/404')
        return;
    }
    // res.render('products/product', {
    //     products: db.get('products').value().slice(start, end),
    //     counts: {
    //         value: page,
    //         increase : gtr 
    //     },
    //     sessions : db.get('sessions').value()
    // })

    const products = await Product.find();
    res.render('products/product', {
        products: products.slice(start, end),
        counts: {
            value: page,
            increase : gtr 
        }
        // sessions : db.get('sessions').value()
    })
}
