const db = require('../db')


module.exports.product = (req, res) => {
    const page = parseInt(req.query.page) || 1 //n
    const perPage = 4 ; //x
    
    const start = (page - 1) * perPage
    const end = page * perPage
    res.render('products/product',{
        products : db.get('products').value().slice(start , end)
    })
}

