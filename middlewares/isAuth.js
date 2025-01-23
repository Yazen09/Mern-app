const  User =require('../Model/User');
const jwt =require ('jsonwebtoken');
const isAuth=async(req,res,Next) =>{
    try {
        const token = req.headers["Authorisation"]
        if (!token){
            return res.status(400).send({errors:[{msg:"not autorisation"}]});
            }
            const decoded=jwt.verify(token,process.env.SCRT_KEY);
            const foundUser=await User.findOne({_id: decoded._id})
            if (!foundUser){
                return res.status(400).send({errors:[{msg:"not autorisation 2"}]});
            }
            req.user=foundUser
            Next()
        } catch (error){
            return res.status(400).send({errors:[{msg:"not autorisation 3"}]});
        }
    }
    module.exports=isAuth;