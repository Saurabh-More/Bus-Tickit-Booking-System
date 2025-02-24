import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { User } from "../models/user.model.js";


// Define Cookies Options
const cookiesOptions = {
    httpOnly:true,
    // secure:false,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // maxAge:24*60*60*1000, // Cookies expires in 2 days 
};

// Function to generate and send token in cookies 
const sendToken = async(res,user,statusCode,message) => 
{
    try 
    {
        //  Create Access Token  
        const accessToken = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn:process.env.ACCESS_TOKEN_EXPIRY }
        );
    
        //  Create Refresh Token  
        const refreshToken = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn:process.env.REFRESH_TOKEN_EXPIRY }
        );
    
        // Save the refresh token in the database 
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        // Send The Response
        res
        .status(statusCode)
        .cookie("accessToken", accessToken, cookiesOptions)   // Add  Access Token in cookies
        .cookie("refreshToken", refreshToken, cookiesOptions) // Add Refresh Token in cookies
        .json({
            success:true,
            message:message,
            tokens:             // Includes tokens in the JSON response for non-browser devices
            {
                accessToken,
                refreshToken,
            }
        });
    } 
    catch (error) 
    {
        return res.
        status(500)
        .json({
            success:false,
            error:"Error while generating tokens",
        })
    }
};


const CheckAuth = (req,res,next) => {
    const user=req.user;
    if(!user)
    {
        return res.status(401).json({success:false,isAuthenticated:false});
    }
    return res.status(200).json({success:true,isAuthenticated:true});
};

// Register Function
const Register = async(req,res,next) => 
{
    try {
        // Get data Input 
        const { name, username, password } = req.body;
            
        // Check All data Is Entered or not
        if(!name || !username || !password)
        {
            return next({message:"All Fields Are Required",statusCode:400});
        } 
        // Check if the user already exists
        const isUser = await User.findOne({ username:username });
        if(isUser)
        {
            return next({ message: "This username is already taken.", statusCode: 400});
        }
    
        // Create the new user 
        const user=await User.create({
            name: name,
            username: username,
            password: password,
        });
        
        // Generate & send the JWT token in the cookies (response is sent by sendToken)
        await sendToken(res, user, 201, "User Created Successfully!");
        
    } catch (error) 
    {
        return next(error);
    }
};

// Login Function
const Login = async(req,res,next) => 
    {
    try 
    {
        // Get user Input 
        const { username, password } = req.body;
        
        // Check Both field are entrted or not 
        if(!username || !password)
        {
            return next({ message: "username and password are required.", statusCode: 400 });
        }
            
        const user = await User.findOne({ username }).select("+password");
        // If user not found or exists
        if(!user)
        {
            return next({ message: "Invalid username or password.", statusCode:401 });
        }

        // if Password not match
        const isPasswordMatch = await compare(password,user.password);
        if(!isPasswordMatch)
        {
            return next({ message: "Invalid username or password.", statusCode:401 });
        }
            
        // Generate & send the JWT token in the cookies (response is sent by sendToken)
        await sendToken(res,user,200,"User logged in successfully !");
            
        } 
    catch (error) 
    {
        return next(error);
    }
}


// Logout Function
const Logout = async (req, res, next) => 
    {
    try {
        // Find & Update the user
        await User.findByIdAndUpdate(
            req.user?._id,   // Find User using this ID
            {
                $set: {
                    refreshToken: undefined, // Clear the refresh token in the database
                },
            }
        );

        // Send the response and clear the cookies
        res
        .status(200)
        .clearCookie("accessToken", cookiesOptions) // Clear the token in cookies
        .clearCookie("refreshToken", cookiesOptions)
        .json({
            success: true,
            message: "User logged out successfully.",
        });

    } catch (error) 
    {
        return next(error);
    }
};


export { Register, Login, Logout, sendToken, CheckAuth };