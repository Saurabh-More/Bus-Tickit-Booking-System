import mongoose from "mongoose";
// Store Booking of each user
const myBookings = new mongoose.Schema(
{   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        min:0,
    },
    phone_no:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    Bus:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bus",
        required:true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled","waiting"],
      default: "pending",
    },
    seatNo:
    {
        type:String,
    },
    transactions: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Transaction",
        }
    ],    
},{ timestamps:true });

const MyBooking = mongoose.models.MyBooking || mongoose.model("MyBooking",myBookings);
export{ MyBooking };