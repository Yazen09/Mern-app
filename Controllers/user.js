const User=require('../Model/User');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register=async(req,res=> {
    try {
        const {firstname,name,email,password}=req.body;
        const foundUser =await User.findOne({email}
            if(foundUser){
                return res.status(400).send({errors:[{msg:"Mail already used "}]})
            }
            const saltRounds=10;
            const hashpassword = await bcrypt.hash(password,saltRounds)

            const newUser= new User ({...req.body})
            newUser.password=hashpassword;
            await newUser.save()

            const token =jwt.sign({
                id:newUser._id
            },process.env.SCRT_KEY,{expiresIn:"48H"})
            res.status(200).send({succes:[{msg:"Registration completed successfully..."}],user:newUser,token})

            }catch (error){
                res.status(400).send({erros:[{msg:"Try Again "}]})
            }
        )

        exports.login=asyn(req,res)=> {
            try {
                const {email,password}=req.body;
                const foundUser=await User.findOne({email})
                if (!foundUser){
                    return res.status(400).send({errors:[{msg:"User not found "}]})
                }
                const checkPassword=await bcrypt.compare(password,foundUser.password)
                if(!checkPassword){
                    return res.status(400).send({errors: [{msg :"Incorrect Password "}]})
                }
                const token=jwt.sign({
                    id:foundUser._id
                },process.env.SCRT_KEY,{expiresIn:"48H"})
                res.status(200).send({succes:[{msg:"Welcome Back "}],user:foundUser,token})
                }catch(error){
                    return res.status(400).send({errors:[{msg:"Login Failed "}]})
                }
        }
        
  