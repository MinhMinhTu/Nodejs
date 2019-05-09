const db = require('../db')
const shortid = require('shortid')

module.exports.create = (req, res, next) =>{
    res.render('transfer/create')
}

module.exports.postCreate = (req, res, next) =>{
    const data = {
        id : shortid.generate(),
        account : req.body.account,
        amount : parseInt(req.body.amount),
        userID : req.signedCookies.userID
    }

    db.get('transfers').push(data).write();
    res.redirect('/transfer/create')
}