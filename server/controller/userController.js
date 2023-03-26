require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//import model - User
const User = require("../model/User")

exports.registerController =    async (req, res) => {
    try {
        // collect all information
        const {firstname, lastname, email, password} = req.body
        // validate the data if exits
        if (!(email && password && lastname && firstname)) {
            res.status(401).send("All field are required")
        }

        // check if email is in correct format or not
        const emailvalidator = require("email-validator");
        if(!(emailvalidator.validate(req.body.email))){
            res.status(401).send('Invalid Email');
        }

        // check if user exits or not
        // await User.findOne({email: email})
       const existingUser = await User.findOne({email})

       if(existingUser) {
        res.status(401).send("User already found in database")
       }

       // encrypt the password
       const myEncryptPassword = await bcrypt.hash(password, 10)


        // create a new entry in database
        //const newUser = await User.create({
        const user = await User.create({
        // firstname: firstname
        firstname,
        lastname,
        email,
        password: myEncryptPassword
       })

       // create a token and send it to user
//       const token = jwt.sign({
//        id: user._id, email
//       }, Process.env.TOKEN_SECRET, {expiresIn: '2h'})

        const token = jwt.sign({id: user._id, email}, process.env.TOKEN_SECRET, {expiresIn: '2h'})

       user.token = token
       //don't want to send the password
       user.password = undefined

        const options = {
           expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
       }
        return res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })

//       res.status(201).json({
//        success: true,
//        user,
//        token
//    })


    } catch (error) {
        console.log(error);
        console.log("Error in response route");
    }
}

exports.loginController = async (req, res) => {
    try {
        //collect information from frontend
        const {email, password} = req.body

        //validate
        if(!(email && password)) {
            return res.status(401).send(("email and password are required"))
        }
        //check user in database
        const user = await User.findOne({email})

        //if user does not exists - assignment
        // if(!user) {
        //     req.status(401).send("create an account first")
        // } not working code says bad request
        //match the password
        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({id: user._id, email}, process.env.TOKEN_SECRET, {expiresIn: '2h'})

            user.password = undefined
            user.token = token

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                path: '/'
            }
            return res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }

        //create token and send
        res.sendStatus(400).send("email or password is incorrect") //not working line says bad request

    } catch (error) {
        console.log(error);
    }
}

exports.profileController =  async (req, res) => {
    try {
        //access to req.user = id, email
    const decode = req.user
    const id = decode.id
    const user = await User.findOne({_id: id})
    user.password = undefined



    //based on id query to DB and get all information of user - findOne({id})
    // const user = findOne({user_id})
    console.log(user)
    //send a json response with all data
    res.status(200).json({
        success: true,
        message: "Finally Profile shown",
        user,
    })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.signoutController = async (req, res) => {
    try {
        //    const {token} = req.body
        //    if(!token) {
        //        new Error("User is Not logged in")
        //        return res.status(400).json({
        //            success: false,
        //            message: "User not logged in"
        //        })
        //    }
        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
