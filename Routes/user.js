const express =require ('express');
const {register,login} =require('../Controllers/user.js');
const { registerValidator, loginValidator, Validation } = require ("../middlewres/Validator.js");
const router=express.Router();


router.post("/register",registerValidator(),Validation,register)
router.post("/login",loginValidator(),Validation,login)
module.exports=router;