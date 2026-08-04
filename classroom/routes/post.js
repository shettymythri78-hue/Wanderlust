const express=require("express");
const router=express.Router();




router.get("/",(req,res)=>{
    res.send("i am posts  root")
});
router.get("/new",(req,res)=>{
    res.send("I am  postsnew");
});
router.post("/",(req,res)=>{
    res.send("POST in posts  user");
});
router.delete("/:id",(req,res)=>{
    res.send("delte the posts id")
})


module.exports=router;