const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";

router.post('/',[
    body("name").isLength({min:3}),
    body("email").isEmail({min:3}),
    body("password").isLength({min:5}),
], async (req,res)=>{
    try{
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,      
        email: req.body.email,      
    });
    
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    
   success=true;
    res.json({success,authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router