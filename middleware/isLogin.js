import obtainToken from "../utility/obtainTokenFromHeader.js"
import verifytoken from "../utility/verifyToken.js";
const isLogin = (req,res,next)=> {
    const token = obtainToken(req);

    const userDecoded = verifytoken(token)
    req.userAuth = userDecoded.id;

    if(!userDecoded) {
        return res.json({
            status:"error",
            message: "token is either expired or invalid"
        });
    }else{
        next();
    }


}

export default isLogin;