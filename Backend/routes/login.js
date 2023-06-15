const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";

router.post('/',[
    body("email").isEmail(),
    body("password").isLength({min:5}),
],async (req,res)=>{
    let success =  false;

    console.log(req.body)
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log("empty")
        return res.status(400).json(success,{error: error.array()});
    }
    let user = await User.findOne({email: req.body.email});
    if(!user){
        success =false;
        return res.status(400).json(success,{error:"Please try to login with correct credential"});
    }
    let password = await User.findOne({password: req.body.password});
    if(!password){
        success =false;
        return res.status(400).json(success,{error:"Please try to login with correct credential"});
    }
    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.send({success,authtoken});
})

module.exports = router