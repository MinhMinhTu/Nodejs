
// const shortid = require('shortid')
const User = require('../models/user.model')


module.exports.index = async (req, res) => {

    const users = await User.find();
    res.render('users/index', {
        users: users
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

module.exports.create = (req, res) => {
    res.render('users/create')
}

module.exports.get = async (req, res) => {
    const userId = req.params.userId;
    const users = await User.find({_id : userId});
    res.render('users/view', {
        users: users[0]
    })
}

module.exports.postCreate = async (req, res) => {

    const data = {
        name: req.body.name,
        phone: req.body.phone,
        avatar : req.file.path.replace(/\\/g, "/").split("/").slice(1).join("/")
    }
    User.create(data);
    res.redirect('/users')
}