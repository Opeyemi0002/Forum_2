import User from "../Models/userModels.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateToken from "../utility/generateToken.js";
import obtainToken from "../utility/obtainTokenFromHeader.js";
 export const registerUser = async (req, res) => {
    try{
        const {firstname, lastname, email, password} = req.body;

        const newUser = await User.findOne({email});

        if(newUser) {
            res.json({
                message: "this user has been registered already"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await User.create({
            firstname,
            lastname, 
            email,
            password: passwordHash
        })
        res.json({
            message:"you have been registered successfully"
        });

    }catch(error) {
        console.log(error.message);
    }
}

export const getUser = async (req,res) => {
    try{
        //console.log(obtainToken(req))
        const findUser = await User.findById(req.userAuth);

        if(findUser) {
            res.json({
                message: "success",
                details: {findUser}
            })
        }
    }catch(error){
        console.log(error.message);
    }
}
export const loginUser = async (req,res) => {
    const{email, password} = req.body;

    try{
        const userFound = await User.findOne({email});

        if(!userFound) {
           res.json({
            message:"you don't have an account with us"
           });
        }
        const passwordFound = await bcrypt.compare(password, userFound.password);
        if(!passwordFound) {
            res.json({
                message:"your email or password is wrong, please check again"
            });
        }else{
            res.json({
                status: "Success",
                data: {
                    firstname:userFound.firstname,
                    lastname:userFound.lastname,
                    email:userFound.email,
                    token:generateToken(userFound._id)

                }

            });
        }

    }catch(error) {
        console.log(error.message);
    }

} 