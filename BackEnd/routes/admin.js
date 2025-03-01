import express from "express";
import { assignBus, editBus, deleteBus, seeCurrentBuses, seePreviousBuses } from "../controllers/Admin/bus.controllers.js";
import { bookSeat, seatDetails, seatStructure, unBookSeat } from "../controllers/Admin/seat.controllers.js";


const app=express.Router();

// Define the controllers authentication for the admin

// After Authentications 

// Routhe for buses
app.get("/buses/upcoming",seeCurrentBuses);
app.get("/buses/previous",seePreviousBuses);

app.post("/assignBus", assignBus);
app.route("/bus/:id")
    .get(seatStructure)
    .patch(editBus)
    .delete(deleteBus);


// Routes for Seats
app.get("/bus/:id/seat/:seatNumber", seatDetails);
app.patch("/bus/:id/book-seat/:seatNumber", bookSeat);
app.patch("/bus/:id/unbook-seat/:seatNumber", unBookSeat);

export default app;