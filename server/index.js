const express=require('express')
const app=express()

//middleware for parsing if required
app.use(express.json())

//making server online here by importing the port 
require("dotenv").config()
PORT=process.env.PORT || 4000
app.listen(PORT,()=>{console.log(`The server is online at port no ${PORT} `)})


//lets connect to the database
const connectDatabase=require("./config/database")
connectDatabase()

//importing routes here and mounting it with base path

const routes=require("./routes/serverROutes") 
app.use("/api/v1",routes)


//default route
app.get("/",(req,res)=>{
    res.send(`<h1>This is homepage</h1>`)
})