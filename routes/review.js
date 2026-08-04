const express=require("express");
const router= express.Router({mergeParams:true});
const Review=require("../models/review.js");
const ExpressError=require("../utilites/ExpressError");
const wrapAsync=require("../utilites/wrapAsync.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js");



//Reviwes post route
router.post("/",isLoggedIn, validateReview,wrapAsync( 
    reviewController.postForm
));

//reviews delete post route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(
    reviewController.deleteForm
));

module.exports=router;