const mongoose=require("mongoose")
require("dotenv").config()

const connectDatabase=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("database connected successfully")})
    .catch((e)=>{
        console.log("some error occured wwhile connecting database",e)
        process.exit()
    })
}

module.exports=connectDatabase