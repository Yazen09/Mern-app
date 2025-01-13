const mongoose = require ('mongoose');

const schema=mongoose.Schema;


const contactSchema=newSchema ({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:Number,
    Profile_img:String,
    cloudinary_id:String

},{timestamps:true})


module.exports=mongoose.model("contact",contactSchema)
 