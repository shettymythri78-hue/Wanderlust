const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utilites/ExpressError");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStartegy=require("passport-local");
const User=require("./models/user.js");

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter = require("./routes/user.js");

main().then(()=>{
    console.log("connection sucessfully");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOption={
secret:"mysupersecretcode",
resave:false,
saveUninitialized:true,
cookie:{
    expires: Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
},
};


//root working
app.get("/",(req,res)=>{
res.send("root is working in server");
});

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

// app.get("/demoUser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"raghushetty19@gmail.com",
//         username:"Raghu"
//     });
//   let registerUser= await user.register(fakeUser,"Shetty@19");
//   res.send(registerUser);
// });

//listing and reviews
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);


//For all roots
// app.all("/{*splat}",(req,res,next)=>{
//     next(new ExpressError(400,"page is not founded !"));
// });
//Middleware
app.use((err, req, res, next) => {
    console.log(err.message);   
let { status = 400, message = "Something went wrong!" } = err;
    res.status(status).render("error.ejs", { message });
});
//server
app.listen(8080,()=>{
    console.log("server is working in a port :8080");
});

// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"Beautiful moutian view",
//         description:"Near by mountains",
//         price:1300,
//         location:"Nandi Hills ,Karnataka",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("success");
// });