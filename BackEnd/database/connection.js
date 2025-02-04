import mongoose from "mongoose";
// Asynchronous function to connect to MongoDB

const ConnectDB = async () => 
{
    try 
    {
        const URI = process.env.MONGO_URI;
        
        if (!URI) 
        {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        // Connect to MongoDB using Mongoose
        const conn = await mongoose.connect(URI, { dbName: "BusTicketBooking" });

        console.log(`\nMongoDB connected ! DB Host: ${conn.connection.host}`);
    } 
    catch (error) 
    {
        console.log(`MongoDB connection failed. Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export { ConnectDB }; 
