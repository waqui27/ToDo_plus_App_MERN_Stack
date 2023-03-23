require("dotenv").config();
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    console.log(req.cookies);
    // const token = req.cookies.token   OBJECT destructuring
    const {token} = req.cookies // || req.body req.header

    // Authorization: "Bearer longtokenvalue"
    // const token = req.header("Authorization").replace("Bearer ", "")

    //what if token is not there
    if(!token) {
        return res.status(403).send("token is missing, need login")
    }

    //verify token
    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(decode)
        req.user = decode


        //extract id from token and query the DB
    } catch (error) {
        res.status(403).send("token is invalid")
    }

    return next()
}

module.exports = auth