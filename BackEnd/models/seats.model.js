import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
{
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    seatNumber: { type: Number, required: true },
    owner: { type: String, enum: ["customer", "admin"], default: "customer" },
    status: { type: String, enum: ["available", "booked"], default: "available" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "MyBooking", default: null }
}, { timestamps: true });

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);

export { Seat };
