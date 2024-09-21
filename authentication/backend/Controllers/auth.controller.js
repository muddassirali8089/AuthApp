import express from "express";
import bcrypt from 'bcrypt';
import userModel from "../model/user.model.js"; // Import User model correctly
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    

console.log("reachedd...")
const { fullName, userName, email, password, confirmPassword, gender , age } = req.body;

    try {
        const { fullName, userName, email, password, confirmPassword, gender , age } = req.body;
        if(fullName === ""){
            console.log("hii..");
            return res.status(400).send({ message: "please enter a valid full name " });
        }
        const validuserName = await userModel.findOne({userName});
        if(validuserName){
            return res.status(400).send({ message: "username must be unique" });
        }
        // Check if passwords match
        if(password.length<6){
            return res.status(400).send({ message: "password must be atleast six characters" });
        }
        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords must match" });
        }

        // Check if user already exists by email
        const existingUserByEmail = await userModel.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).send({ message: "User with this email already exists" });
        }

        if(age<=0){
            return res.status(400).send({ message: "age must be greater than zero" });
        }
        const salt = await bcrypt.genSalt(10);



        const hashPassword = await bcrypt.hash(password , salt);
        
        // Create a new user
        const newUser = new userModel({
            fullName,
            userName,
            email,
            password : hashPassword,
            age,
            gender
        });

if(newUser){

  const  idToken =  generateTokenAndSetCookie(newUser._id , res);
    await newUser.save();

    
    res.status(201).json({
        token : idToken,
        message : "successful create user",
    });

}
else{
    res.status(400).json({
        message : "invalid userdata"
    })
}
        
        
       
    } catch (error) { 
        console.error("Error in signup controller:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            id: user._id,
            userName: user.userName,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "internal server error"
        });
    }
}


export const logout = (req, res) => {

    try {
        res.cookie("jwt" , "" , {maxAge : 0});
    res.status(200).json({ message: "Logout successful" });
    } catch (error) {

        console.log("Error in logout controller", error.message);
        res.status(500).json({
            error: "internal server error"
        });
        
    }
    
}

    




