
const obtainToken = (req)=> {
    const headerDetails = req.headers;

    const token = headerDetails['authorization'].split(" ")[1];
    return token;
}

export default obtainToken;