//VARIABLE ENVIROMENT
require('dotenv').config()


//models
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const cardRoutes = require('./routes/card.routes')
const transferRoutes = require('./routes/transfer.routes')
//api
const apiProductRoutes = require('./api/routes/product.routes')


const middleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

//connect mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

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
//anh huong đến tất ca ác đường
app.use(sessionMiddleware)


// routes
app.get('/',(req, res) => {
    res.render('index', {
        name: 'AAA'
    })
})
app.use('/users', middleware.required, userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/card', cardRoutes)
app.use('/transfer', middleware.required, transferRoutes)
//api 
app.use('/api/products', apiProductRoutes)





//run server
app.listen(port, () => console.log(`server listening on port ${port}`))