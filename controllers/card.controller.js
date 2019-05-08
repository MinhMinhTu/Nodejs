const db = require('../db')

module.exports.addToCard =(req, res, next) =>{
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products')
        return;
    }

    let count = db.get('sessions')
                    .find({id : sessionId})
                    .get('card.' + productId, 0)
                    .value()

    console.log(count)
    db.get('sessions')
        .find({id : sessionId})
        .set('card.' + productId, count + 1)
        .write()
        console.log(count)
    res.redirect('/products')
  
}