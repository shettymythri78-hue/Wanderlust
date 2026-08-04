const express=require("express");
const router= express.Router();
const wrapAsync=require("../utilites/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");



const User=require("../models/user.js");
const user = require("../models/user.js");


const userController=require("../controllers/users.js");


router.route("/signup")
.get(userController.signUpForm)
.post(wrapAsync(userController.userSignUpForm));


router.route("/login")
.get(userController.userLogInForm)
.post(saveRedirectUrl, passport.authenticate("local",
    {failureRedirect:'/login',failureFlash:true}),
userController.logInForm
)


router.get("/logout",
    userController.logOutForm
)


module.exports=router;