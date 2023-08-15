import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API_Key,
    api_secret: process.env.Cloud_API_Secret
});

//create instance of cloudinary storage

const storage = new CloudinaryStorage ({
    cloudinary,
    allowedFormats:["jpg", "png"],
    params:{
        folder:"forum_2",
        transformation:[{width:400, height:400, crop:"limit"}]
    }
});

export default storage;