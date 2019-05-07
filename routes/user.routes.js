const express = require('express')
const router = express.Router()

const db = require('../db')
const shortid = require('shortid')


router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})


router.get('/search', (req, res) => {
    let users = []
    let q = req.query.q.toLowerCase();
    let matchUsers = db.get('users').find({ name: q }).value();
    users.push(matchUsers)
    res.render('users/index', {
        users: users
    })
})

router.get('/create', (req, res) => {
    res.render('users/create')
})
router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('')
})
//user id
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    const user = db.get('users').find({id : userId}).value()
    res.render('users/view', {
        users: user
    })
})
module.exports = router
