import User from "../Models/userModels.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateToken from "../utility/generateToken.js";
//import obtainToken from "../utility/obtainTokenFromHeader.js";


 export const registerUser = async (req, res) => {
    try{
        const {firstname, lastname, email, password} = req.body;

        const newUser = await User.findOne({email});

        if(newUser) {
            return res.json({
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

export const profilePhotoUploadController = async (req,res)=> {
    try{
        const profileUserToBeUpdated = await User.findById(req.userAuth);

        if (!profileUserToBeUpdated) {
             res.json({
                status:"error",
                message: "user not found"
            });
        }

        if(req.file) {
            await User.findByIdAndUpdate(req.userAuth, {
                $set:{
                    profilephoto: req.file.path
                }
            }, {
                new:true
            })
            res.json({
            status:"success",
            data: "Image uploaded successfully"
        });
        }
        
    }catch(error) {
        console.log(error.message);
    }
} 

export const profileViewLogic = async (req,res)=> {
    try{
        const profileOwner = await User.findById(req.params.id);
        const profileViewer = await User.findById(req.userAuth);

        if (profileOwner && profileViewer) {
            const profileAlreadyViewed = profileOwner.views.find(view=>view.toString()===profileViewer._id.toString());

            if (profileAlreadyViewed) {
                return res.json({
                    status:"error",
                    message: " you have viewed this profile"
                });
            }else {
                profileOwner.views.push(profileViewer._id);
                await profileOwner.views.save();

                return res.json({
                    message: "you have just viewed this profile"
                });

            }
        }
        res.json({
            message:"the page is not available at this moment"
        });
    }catch(error) {
        console.log(error.message);
    }
}

export const FollowLogic = async (req,res)=> {
    try{
        const profileTofollow = await User.findById(req.params.id);
        const profileThatfollow = await User.findById(req.userAuth);

        if(profileTofollow && profileThatfollow) {
            const userAlreadyFollowed= await profileThatfollow.following.find(follower=>follower.toString()=== profileTofollow._id.toString());

            if(userAlreadyFollowed) {
                return registerUser.json({
                    message:"you have already follow this profile"
                });
            }else {
                profileThatfollow.following.push(profileTofollow._id);
                await profileThatfollow.following.save();

                profileTofollow.followers.push(profileThatfollow._id);
                await profileTofollow.followers.save();

                return res.json({
                    message: `you have just followed ${profileTofollow.firstname}`
                });

            }

        }
        res.json({
            message:"you cannot access this page"
        });
    }catch(error) {
        console.log(error.message);
    }
}