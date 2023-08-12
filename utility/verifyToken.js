import jwt from "jsonwebtoken";

const verifytoken = (token)=> {
    return jwt.verify(token, process.env.JWT_KEY, (error, decoded)=> {
        if(error) {
            return false;
        }
        return decoded;
    } )
}

export default verifytoken;