if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utilites/ExpressError");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const MongoStore = require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStartegy=require("passport-local");
const User=require("./models/user.js");

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter = require("./routes/user.js");
 const dbUrl=process.env.ATLASDB_URL;
 async function main(){
    await mongoose.connect(dbUrl);
    console.log("connected to db");
}

main().then(()=>{
    console.log("connection sucessfully");
}).catch((err)=>{
    console.log(err);
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

console.log("SESSION_SECRET exists:", !!process.env.SESSION_SECRET);
console.log("RENDER SESSION SECRET:", !!process.env.SESSION_SECRET);
const store = MongoStore.create({ mongoUrl:process.env.ATLASDB_URL,
crypto:{
secret:process.env.SESSION_SECRET
},
touchAfter:24*60*60,
   })
   store.on("error",(err)=>{
console.log("ERROR IN MONGO SESSION STORE ",err)
});

const sessionOption={
 store,
secret:process.env.SESSION_SECRET,
resave:false,
saveUninitialized:true,
cookie:{
    expires: Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
},
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currentUser=req.user;
    next();
});


app.get("/", (req, res) => {
    res.redirect("/listings");
});

//listing and reviews
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);



//Middleware
app.use((err, req, res, next) => {
    console.log(err.stack);   
let { status = 400, message = "Something went wrong!" } = err;
    res.status(status).render("error.ejs", { message });
});
//server
app.listen(8080,()=>{
    console.log("server is working in a port :8080");
});

