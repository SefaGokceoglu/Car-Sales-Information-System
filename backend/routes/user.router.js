const router =require('express').Router();
const User =require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
    try {
    const {username ,email, password ,passwordVerify}=req.body;

    if(!email || !username ||!password ||!passwordVerify){
        return res.status(400).json({msg: "Please enter all fields!!"})
    }
    if(password.length < 5){
        return res.status(400).json({msg:"Password must be at least 6 character!"})
    }
    if(password !== passwordVerify){
        return res.status(400).json({msg:"Passwords doesnt match up!"})
    }  
    const email_exist=await User.findOne({email:email})  
    if(email_exist){
        return res.status(400).json({msg:"Email already exists!"})
    }
    const username_exist= await User.findOne({username:username})
    if(username_exist){
        return res.status(400).json({msg:"Username already taken!"})
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
        username,
        email,
        password:hashPassword,
    })

    const savedUser =await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_PASSWORD);


    res.json({token,username:savedUser.username})

    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.post('/login', async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({msg:"Please enter all fields!"})
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({msg:"This email not registered!"})
    }

    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        return res.status(400).json({msg:"Wrong password"})
    }

    const token = jwt.sign({ id: user._id  }, process.env.JWT_PASSWORD);

    res.json({token,username:user.username})

})



module.exports = router;