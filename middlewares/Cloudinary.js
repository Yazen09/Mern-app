const cloudinary =require ('cloudinary').v2
const  dotenv =dotenv ('dotenv');
dotenv.config();
cloudinary.config({
    cloud_name:process.env.Ky_name,
    api_key:process.env.API_key,
    api_secret:process.env.API_Secret,
});
module.exports=cloudinary;