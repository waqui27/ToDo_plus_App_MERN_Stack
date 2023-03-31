const express = require("express")
//custom middleware
const auth = require("../middleware/auth")

const { registerController, loginController, profileController, signoutController } = require("../controller/userController")

const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/profile", auth, profileController)
router.get("/signout", signoutController)

module.exports = router;