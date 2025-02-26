import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
{
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MyBooking",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0,
    },
    paymentMethod:{
        type:String,
        enum: ["credit_card","upi", "cash"],
        required:true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },
    transactionId: {
      type: String, 
      unique: true,
      required: true,
    },
},
{
    timestamps:true,
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema);
export{ Transaction };