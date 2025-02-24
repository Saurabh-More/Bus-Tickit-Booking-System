import express from 'express';
import dotenv from 'dotenv';  
import cookieParser from 'cookie-parser';
import cors from "cors";
import { ConnectDB } from './database/connection.js';
import userRoute from "./routes/user.js";
import errorHandler from "./middlewares/error.Middleware.js";

// Load environment variables from .env file
dotenv.config({
    path: '.env', 
});


// Connect to the database
await ConnectDB();

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = 
{
    origin : [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
    ],
    credentials: true,              // Allow credentials (cookies)
}

// Middlewares 
app.use(express.json());      // To get data in JSON format
app.use(cookieParser());      // Use to access the user cookies and set it 
app.use(cors(corsOptions));   // Used to avoide cors error

// Acces the User Routes 
app.use("/api/v1/user",userRoute);


// Basic GET route
app.get("/", (req, res) => {
    res.send('Hello From Express!');
});



// Handle Error in the Code 
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
