const md5 = require('md5')
const db = require('../db')




module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    let email = req.body.email; 
    let password = req.body.password; 

    let user = db.get('users').find({email: email}).value();
    console.log(user)
    if(!user){
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
    
    if(user.password !== hashPassword){
        res.render('auth/login',{
            errors : [
                'wrong password'
            ],
            values:req.body
        })
        return;
    }

    res.cookie('userID',user.id)
    res.redirect('/users')
}