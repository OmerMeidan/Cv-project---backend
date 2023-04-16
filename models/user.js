const { json } = require("express")
const mongoose=require("mongoose")
const Joi = require('joi')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    }
})

const JoiSchema = Joi.object({
    email:Joi.string().min(5)
})
module.exports = mongoose.model('User',UserSchema)