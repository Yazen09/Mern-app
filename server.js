const express=require("express");
const app=express();
const connectDB =require('./config/connectDB');
require("dotenv").config();
const PORT=process.env.PORT


// Create SERVER 

app.listen(PORT,error => {
    error ? console.error(`fail to connect,${error}`):
    console.log(`server is running at ${PORT}`)
})

// ConnectDB function

connectDB();

 // cloudinary configuration 

 
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.API_SECRET
  });
  


