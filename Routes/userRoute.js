import express from "express";
import {registerUser, getUser, loginUser,FollowLogic, unFollowLogic, profilePhotoUploadController,blockUser, unBlockUser, profileViewLogic} from "../controller/userController.js";
import isLogin from "../middleware/isLogin.js";
import storage from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({storage});

router.post ('/register', registerUser);
router.get('/profile/', isLogin, getUser);
router.post('/login', loginUser);
router.post('/profile-image',isLogin,upload.single('profile'),profilePhotoUploadController );
router.get ('/profile/:id', isLogin, profileViewLogic);
router.get ('/profilefollow/:id', isLogin, FollowLogic);
router.get ('/profileunfollow/:id', isLogin, unFollowLogic);
router.get ('/profileblock/:id', isLogin, blockUser);
router.get ('/profileunblock/:id', isLogin, unBlockUser);






 export default router;