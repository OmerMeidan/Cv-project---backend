const UserSchema=require("../models/user")
const CvSchema=require("../models/cv")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
exports.AddUser = async (req,res)=>{
    const {email,password,firstName,lastName} = req.body
    const hash = await bcrypt.hash(password,10)
    const newUser = new UserSchema({email,password:hash,firstName,lastName})
    newUser.save((error,userSchema)=>{
        if(error){
            res.status(500).send("failed" + error)
        }
        else
            res.status(200).json({userSchema})
    })
}
exports.Login = (req,res)=>{
    UserSchema.findOne({email:req.body.email},(error,userSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else if(!userSchema){
            res.status(403).json(error)
        }
        else{
            bcrypt.compare(req.body.password,userSchema.password,(error,Ismatch)=>{
                if(error || !Ismatch){
                    res.status(402).json({message:"error"+error})
                }
                // else if(!Ismatch){
                //     res.status(401).json({message:"not match"})
                // }
                else{
                    const token=jwt.sign({id:userSchema._id},process.env.JWT_SECRET)
                    res.status(200).send(token)
                }
            })  
        }
    }
    )
}
exports.CvCreator= (req,res)=>{
    console.log(req.body);
    const newCv= new CvSchema(req.body)
    newCv.save((error,cvSchema)=>{
        if(error){
            res.status(500).send("failed" + error)
        }
        else{
            res.status(200).send(cvSchema)
        }
    })
}
exports.GetId = (req,res)=>{
    UserSchema.findOne({email:req.body.email},(error,userSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else if(!userSchema){
            res.status(403).json({userSchema})
        }
        else{
           res.status(200).send(userSchema._id)
        }
    }
    )
}
exports.getAllCv=(req,res)=>{
    CvSchema.find({owner:req.body.owner},(error,cvSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            res.status(200).send(cvSchema)
            console.log(req.cookies);
        }
    })
}
exports.DeleteCv = (req,res)=>{
    CvSchema.findByIdAndDelete(req.body.index,(error,cvSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            res.status(200).send(cvSchema)
        }
    })
}