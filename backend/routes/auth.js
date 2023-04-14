const express = require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')


//Create a User using : POST "/api/auth/". Doesn't require Auth
router.post("/",[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast of 5 characters').isLength({min : 5})]
,(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => {console.log(user); res.json(user)}).catch((err)=>{
        console.log(err);
        res.json({error : "Please enter a unique value for email", message : err.message})
      })
    // res.send(req.body)
})

module.exports = router