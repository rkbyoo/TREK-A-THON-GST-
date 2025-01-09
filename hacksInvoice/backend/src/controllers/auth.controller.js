import bcrypt from 'bcryptjs';

import {User} from "../models/user.model.js"
import dotenv from "dotenv"
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js"

dotenv.config();

// Sign Up controller
export const signUp = async(req,res)=>{
    const {email,password,name} = req.body; 
    try{

        if(!email || !password || !name){
            throw new Error("All fields are required")
        }

        //Checking if the user already exists
        const userAlreadyExists = await User.findOne({email});

        //Checking if the user already exists
        if(userAlreadyExists){
            throw new Error("User already Exist! Email occupied")
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password,10);

        //now creating the user
        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        //save the user to the database
        await user.save();

        //jwt
        generateTokenAndSetCookie(res,user._id);

        //send the user details
        res.status(201).json({success:true,message:"User registered Succesfully!",
            user:{
                ...user._doc,
                password:""
            }})

    }catch(error){
        //If any error occurs, send the error message
        res.status(400).json({success: false,message:error.message})
    }
}


//Login controller
export const logIn = async(req,res)=>{
    const {email,password} = req.body;
    try{

        if(!email || !password){
            throw new Error("All fields are required")
        }

        //Checking if the user exists
        const user = await User.findOne({email});

        if(!user){
            throw new Error("User does not exist! Please Sign Up")
        }

        //Checking if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials")
        }

        //jwt
        generateTokenAndSetCookie(res,user._id);

        //send the user details
        res.status(200).json({success:true,message:"User logged in Succesfully!",
            user:{
                ...user._doc,
                password:""
            }})

    }catch(error){
        //If any error occurs, send the error message
        console.log("Error in login",error)
        res.status(400).json({success: false,message:error.message})
    }
}


//Logout controller
export const logOut = async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logged out Successfully!"});
}


//auth check used for protected routes
export const authCheck = async(req,res)=>{
    try{
        const user = await User.findById(req.userId);  //userId is coming from verifyToken middleware

        if(!user){
            throw new Error("User not found")
        }

        res.status(200).json({success:true,message:"User authenticated successfully!",user:{
            ...user._doc,
            password:""
        }})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}