const express=require("express");
const app=express();
const  session=require("express-session");
const flash=require("connect-flash");
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const path=require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOptions={
secret:"mysupersecretstring",
        resave:false,
        saveUninitialized:true
}
app.use(session(sessionOptions));
app.use(flash())
app.use((req,res,next)=>{
res.locals.messages=req.flash("success");
res.locals.errors=req.flash("error");
      next();
});



app.get("/register",(req,res)=>{
    let{name="ananyomous"}=req.query;
    req.session.name=name;
    if(name === "ananyomous"){
req.flash("error","user not registered")
    }else{
req.flash("success","user registerd successfully")
    }
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    
    res.render("page.ejs",{name:req.session.name});
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
// req.session.count=1;
//     }
//     res.send(`you sent request for ${req.session.count} times`);
// });


//-----------COOKIE-PARESE-------------
// console.dir(req.cookies); //COOKIE-PARSER
// app.use(cookieParser("secretcode"));
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("color","pink",{signed:true});
//     res.send("success");
// });
// app.get("/verfiy",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","Namasta");
//     res.cookie("Madein","India");
//     res.send("send some cookies");
// });

// app.get("/greet",(req,res)=>{
//   let {name="anonymous"} =req.cookies;
//   res.send(`Hi ${name}`) ;
// })
app.listen(8080,()=>{
    console.log("listen a port on 8000 ports");
});