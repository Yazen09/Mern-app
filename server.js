const express = require('express');

// 2 create istance

const app = express();

// 4 require dotenv

app.use(express.json()) ;

require("dotenv").config() ;


//6 connect db

const connectDB = require("./config/connectDB");
connectDB() ;

// 7 create routes

app.use("/api/contact" , require("./routes/contact") )

app.use("/api/user",require("./routes/user"))

// cors

var cors = require('cors')
 
app.use(cors())

// 3 create port

const PORT = process.env.PORT


//5 create server

app.listen(PORT , error=> {
    error ? console.error(`fail to connect , ${error}`) : 
    console.log(`Server is running at ${PORT}`)
})


