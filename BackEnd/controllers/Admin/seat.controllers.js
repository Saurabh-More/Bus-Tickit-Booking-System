import { Seat } from "../../models/seats.model.js";
import { MyBooking } from "../../models/myBookings.model.js";
// Admin can make available seats to booked or not available 
const bookSeat = async (req, res, next) => 
{
    try {
        const { id, seatNumber } = req.params;

        const seat = await Seat.findOneAndUpdate(
            { bus: id, seatNumber, status: "available" },
            { owner: "admin", status: "booked" },
            { new: true }
        );

        if (!seat) 
        {
            return next({ message: "Seat not found or already booked.", statusCode: 404 });
        }

        res.status(200).json({
            success: true,
            message: "Seat booked successfully",
            seat
        });

    } catch (error) {
        next(error);
    }
};

// Admin can unbook booked 
const unBookSeat = async (req, res, next) => 
{
    try {
        const { id, seatNumber } = req.params;

        const seat = await Seat.findOneAndUpdate(
            { bus: id, seatNumber, owner: "admin", status: "booked" },
            { owner: "customer", status: "available" },
            { new: true }
        );

        if (!seat) 
        {
            return next({ message: "Seat not found or already available", statusCode: 404 });
        }

        res.status(200).json({
            success: true,
            message: "Seat made available.",
            seat,
        });

    } catch (error) {
        next(error);
    }
}; 

// Admin can see the seat structure of the bus
const seatStructure = async (req,res,next) =>
{
    try 
    {
        const { id } = req.params;
        const seats = await Seat.find({bus:id});
        if (!seats || seats.length === 0) {
            return next({ message: "No seats are assigned for this bus", statusCode: 404 });
        }

        // send seat details to the UI
        res
        .status(200)
        .json({
            success:true,
            message: "Seats structure retrieved successfully",
            seats,
        });
    } 
    catch (error) 
    {
        next(error);    
    }
};

// Admin can See Details of the any perticular seat
const seatDetails = async (req, res, next) => 
{
    try 
    {
        const { id, seatNumber } = req.params;

        const seat = await Seat.findOne({ bus: id, seatNumber }).populate("customer");

        if (!seat) {
            return next({ message: "Seat not found.", statusCode: 404 });
        }

        res.status(200).json({
            success: true,
            message: "Seat details retrieved successfully",
            seat,
        });

    } catch (error) {
        next(error);
    }
};


export { seatStructure, seatDetails, bookSeat, unBookSeat };
    
    