const db = require('../db')
const shortid = require('shortid')


module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
};

module.exports.search = (req, res) => {
    let users = []
    let q = req.query.q.toLowerCase();
    let matchUsers = db.get('users').find({ name: q }).value();
    users.push(matchUsers)
    res.render('users/index', {
        users: users
    })
}

module.exports.create =  (req, res) => {
    console.log(req.cookies)
    res.render('users/create')
}

module.exports.get = (req, res) => {
    const userId = req.params.userId;
    const user = db.get('users').find({id : userId}).value()
    res.render('users/view', {
        users: user
    })
}

module.exports.postCreate =(req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
}