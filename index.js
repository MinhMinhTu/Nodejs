//VARIABLE ENVIROMENT
require('dotenv').config()


//models
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const cookieParser = require('cookie-parser')

const middleware = require('./middlewares/auth.middleware')

//set engine pug
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))


//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//read cookie
app.use(cookieParser(process.env.SESSION_SECRET))


// routes
app.get('/',(req, res) => {
    res.render('index', {
        name: 'AAA'
    })
})
app.use('/users', middleware.required,  userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/404', productRoutes)



//run server
app.listen(port, () => console.log(`server listening on port ${port}`))