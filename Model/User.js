const mongoose = require ('mongoose');

const schema=mongoose.Schema ;

const UserSchema = new schema ({
    name:{type:String,required:true},
    firstname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}


})


module.exports = mongoose.model("User", UserSchema);