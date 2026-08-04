const Listing=require("../models/listing");
const Review=require("../models/review");
const User=require("../models/user");

module.exports.signUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.userSignUpForm=async(req,res,next)=>{
    try{
let {username,email,password}= req.body;
const  newUser= new User ({email,username});
const  registerUser=await  User.register(newUser,password);
console.log(registerUser);
req.login(registerUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to Wanderlust!");
res.redirect("/listings");
})
} catch(e){
        req.flash("error", e.messages);
        res.redirect("/signup");
    }
}

module.exports.userLogInForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.logInForm=async(req,res)=>{
   req.flash("success","welcome  back to wanderlust! ");
   let redirectUrl=res.locals.redirectUrl ||"/listings"
res.redirect(redirectUrl);
}

module.exports.logOutForm=(req,res,err)=>{
    req.logout((err)=>{
        if(err){
          next(err);  
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}