const md5 = require('md5')
// const db = require('../db')
const User = require('../models/user.model')



module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = async (req, res) => {
    let email = req.body.email; 
    let password = req.body.password; 

    let user = await User.find({email: email});
    if(!user[0]){
        res.render('auth/login', {
            errors :[
                'User not exits'
            ],
            values:req.body
        });
        return;
    }

    //hash password client req 
    let hashPassword = md5(password)

    if(user[0].password !== hashPassword){
        res.render('auth/login',{
            errors : [
                'wrong password'
            ],
            values:req.body
        })
        return;
    }

    res.cookie('userID',user[0].id,{ signed: true })
    res.redirect('/users')
}