import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
    {
      bus: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Bus", 
        required: true 
    },
    seats: [
      {
        seatNumber: { type: Number, required: true }, 
        status: { 
          type: String, 
          enum: ["available", "booked"], 
          default: "available" 
        }
      }
    ],
},{ timestamps: true });
  
const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);

export{ Seat };