const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("i am root")
});
router.get("/new",(req,res)=>{
    res.send("I am new");
});
router.post("/",(req,res)=>{
    res.send("post in user");
});
router.delete("/:id",(req,res)=>{
    res.send("delte the users id")
});



module.exports=router;