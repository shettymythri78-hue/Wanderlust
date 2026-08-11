const { ref } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const  Review=require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    image: {
        url:String,
        filename:String,
    },

    price: Number,
    location: {
    type: String,
    required: true
},

country: {
    type: String,
    required: true
},


    reviews:[{
type:Schema.Types.ObjectId,
ref:"Review"
 }
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
category:{
    type:String,
    enum:["mountains","arctic","farms","rooms","trending","camping",
        "castles","domes","new","Iconic Cities"]
}

});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
 await Review.deleteMany({reviews:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;