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
    req.body.avatar = req.file.path.replace(/\\/g, "/").split("/").slice(1).join("/");
    db.get('users').push(req.body).write()
    res.redirect('/users')
}