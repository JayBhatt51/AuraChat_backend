const asynHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require("../config/generateToken")
const bcrypt = require('bcryptjs')
const registerUser =asynHandler( async (req,res)=>{
    const { name,email,password,pic } = req.body
    if(!name || !email || !password )
    {
        res.status(400)
        throw new Error("Plase Fill all the fiields")
    }
    const userExist = await User.findOne({email})
    if(userExist)
    {
        res.status(400)
        throw new Error("User already exist")
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await  User({
        name,
        email,
        password:hashpassword,
        pic
    })
    await user.save();
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create a user")
    }
})

const authUser =asynHandler( async (req,res)=>{
        const { email , password} = req.body;
        if(!email || !password )
    {
        res.status(400)
        throw new Error("Plase Fill all the fiields")
    }
        const user = await User.findOne({email})
        if(!user)
        {
            res.status(400)
            throw new Error("User doesn't exist")
        }
        const validpassword = await bcrypt.compare(password,user.password)
        if(!validpassword)
        {
            res.status(400)
            throw new Error("Invalid Password")
        }
        return res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })  
})

module.exports = { registerUser,authUser }