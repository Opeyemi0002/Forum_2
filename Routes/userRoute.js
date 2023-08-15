import express from "express";
import {registerUser, getUser, loginUser, FollowLogic, profilePhotoUploadController, profileViewLogic} from "../controller/userController.js";
import isLogin from "../middleware/isLogin.js";
import storage from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({storage});

router.post ('/register', registerUser);
router.get('/profile/', isLogin, getUser);
router.post('/login', loginUser);
router.post('/profile-image',isLogin,upload.single('profile'),profilePhotoUploadController );
router.get ('/profile/:id', profileViewLogic);
router.get ('/profilefollow/:id', FollowLogic);





 export default router;