const express=require("express");
const router= express.Router();
const wrapAsync=require("../utilites/wrapAsync.js");
const ExpressError=require("../utilites/ExpressError");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");


const listingController=require("../controllers/listing.js");

router.route("/")
.get(wrapAsync (listingController.index))
.post(validateListing,wrapAsync(listingController.renderCreateForm)); 

//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.renderShowForm))
.put(isLoggedIn,validateListing, isOwner,wrapAsync
(listingController.renderUpdateForm ))
.delete(isLoggedIn,isOwner,wrapAsync( listingController.renderDeleteForm));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));




module.exports=router;
