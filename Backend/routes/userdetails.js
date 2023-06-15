const express = require('express');
const router = express.Router();
const User = require('../models/User')
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";


router.get('/', async (req,res)=>{
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"plaese authenticate using a valid token"})
    } 
    try {
        const data = jwt.verify(token, JWT_SECRET);
        
     //   console.log(data);

        const user = await User.findOne({_id: data.user.id});
        
        res.json(user)
        
    } catch (error) {
        res.status(401).send({error:"Internal Server Error"})
 
    }
})

module.exports = router