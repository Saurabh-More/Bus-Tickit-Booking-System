import { Bus } from "../../models/buses.model.js";
import { Seat } from "../../models/seats.model.js";

const assignBus = async (req, res, next) => 
{
    try 
    {
        const { from, to, price, aperture, departure, totalSeats } = req.body; 

        // Check if any field is missing
        if (!from || !to || !aperture || !departure || !totalSeats || !price) 
        {
            return next({ message: "All fields are required", statusCode: 400 });
        }

        // Create a new Bus
        const bus = await Bus.create({ from, to, price, aperture, departure, totalSeats });
        
        // Generate seat array
        const seatArray = Array.from({ length: totalSeats }, (_, index) => ({
            bus: bus._id,
            seatNumber: index + 1,
            owner: "customer",
            status: "available",
            customer: null
        }));

        // Save all seats in one go
        await Seat.insertMany(seatArray);

        // Send the response to admin that the bus is created
        res.status(201).json({
            success: true,
            message: "Bus Created Successfully",
            bus, // Optionally return the created bus details
        });

    } 
    catch (error) 
    {
        next(error); // Pass error to the global error handler
    }
};

const editBus = async (req, res, next) => 
{
    try 
    {
        const { id } = req.params; // Extract bus ID from URL
        const updates = req.body;  // Get update data from request body

        // Ensure there is update data
        if (!updates || Object.keys(updates).length===0) 
        {
            return next({ message: "No changes provided.", statusCode: 400 });
        }

        const updatedBus = await Bus.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBus) 
        {
            return next({ message: "Bus not found", statusCode: 404 });
        }

        res.status(200).json({
            success: true,
            message: "Bus updated successfully",
            bus: updatedBus,
        });
    } 
    catch (error) 
    {
        next(error);
    }
};

const deleteBus = async(req,res,next) =>
{
    try 
    {
        const { id } = req.params;
        const deletedBus = await Bus.findByIdAndDelete(id);
        if(!deletedBus)
        {
            return next({message:"Bus not found",statusCode:400});
        }


        // if any { seat is booked && owner=customer  && paymentMethos1="cash" } then refund their amount
        //   {===>> Do if tou have did Transaction code  <<===}

        // Delete associated seats
        await Seat.deleteMany({ bus: id });

        res
        .status(200)
        .json({
            success:true,
            message:"Bus deleted Successfully."
        })
    } 
    catch (error) 
    {
        next(error);    
    }
};

// See all current or upcoming buses for admin 
const seeCurrentBuses = async (req, res, next) => {
    try 
    {
        const buses = await Bus.find({ departure: { $gt: new Date() } });

        if (!buses || buses.length === 0) 
        {
            return next({ message: "No upcoming or current buses available.", statusCode: 404 });
        }

        res
        .status(200)
        .json({
            success: true,
            message: "Current or upcoming buses retrieved successfully.",
            buses,
        });
    } 
    catch (error) 
    {
        next(error);
    }
};

// See all previous buses for admin
const seePreviousBuses = async (req,res,next) => 
{
    try 
    {
        const buses = await Bus.find({departure : { $lt : new Date() }});
        if(!buses || buses.length===0)
        {
            return next({ message:"No previous buses available.",statusCode:404 });
        } 

        res
        .status(200)
        .json({
            success:true,
            message:"Previous buses retrieved successfully.",
            buses,
        })
    } 
    catch (error) 
    {
        next(error);    
    }
};

export { assignBus, editBus, deleteBus, seeCurrentBuses, seePreviousBuses};
