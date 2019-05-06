//models
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

//dung tam lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
    .write()

//set engine pug
app.set('view engine', 'pug')
app.set('views', './views')


//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// routes
app.get('/', (req, res) => {
    res.render('index', {
        name: 'AAA'
    })
})

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})




app.get('/users/search', (req, res) => {
    let users = []
    let q = req.query.q.toLowerCase();
    let matchUsers = db.get('users').find({ name: q }).value();
    users.push(matchUsers)
    res.render('users/index', {
        users: users
    })
})

app.get('/users/create', (req, res) => {
    res.render('users/create')
})
app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
})
//user id
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    const user = db.get('users').find({id : userId}).value()
    res.render('users/view', {
        users: user
    })
})

//run server
app.listen(port, () => console.log(`server listening on port ${port}`))