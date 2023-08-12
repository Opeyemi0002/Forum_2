import {Schema, model} from "mongoose";

const usermodel = new Schema({
    firstname: {
        type:String,
        required:[true, "this field is compulsory"]
    },
    lastname: {
        type:String,
        required:[true, "this field is compulsory"]
    },
    email: {
        type:String,
        required:[true, "this field is compulsory"]
    },
    password: {
        type:String,
        required:[true, "this field is compulsory"]
    },
    profilephoto: {
        type:String,
    },
    isBlock: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type:String,
        default:false
    },
    role:{
        type:String,
        enum: ["Admin", "Editor", "Guest"]
    },
    views: [{
        type:Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [{
        type:Schema.Types.ObjectId,
        ref: "Post"
    }],
    following: [{
        type:Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type:Schema.Types.ObjectId,
        ref: "User"
    }],
        comment:[{
        type:Schema.Types.ObjectId,
        ref: "Comment"
    }],
    award: {
        type:String,
        enum:["Bronze", "Silver", "Gold"],
        default: "Bronze"
    },

},{
    timestamps: true,
    toJSON: {virtuals:true}
})

const User = model("User", usermodel );

export default User;