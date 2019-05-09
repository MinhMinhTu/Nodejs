// const db = require('../db')
const User = require('../models/user.model')

module.exports.required = async (req, res, next) =>{
    if(!req.signedCookies.userID){
        res.redirect('/auth/login')
        return;
    }

    
    let user  = await User.find({_id : req.signedCookies.userID});
    if(!user[0]){
        res.redirect('/auth/login')
        return;
    }
        res.locals.user = user;
    next();
}