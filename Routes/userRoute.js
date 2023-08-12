import express from "express";
import {registerUser, getUser, loginUser} from "../controller/userController.js";
import isLogin from "../middleware/isLogin.js";
const router = express.Router();

router.post ('/register', registerUser);
router.get('/profile/', isLogin, getUser);
router.post('/login', loginUser)






 export default router;