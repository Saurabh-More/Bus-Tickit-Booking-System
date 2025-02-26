import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendToken } from "../controllers/Authentication.Controllers.js";

const isAuthenticated = async (req, res, next) => 
{
    try 
    {
        // Retrieve tokens from cookies
        const accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;

        // Neither token is present
        if (!accessToken && !refreshToken) 
        {
            return next({ message: "Please login to access this route", statusCode: 401 });
        }

        // If access token is present, verify it
        if (accessToken) 
        {
            try 
            {
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);

                // Attach user info to the request object
                req.user = 
                {
                    _id: decoded._id,
                    username: decoded.username,
                };

                return next(); // Token is valid, proceed
            } 
            catch (error) 
            {
                if (error.name !== "TokenExpiredError") 
                {
                    // Token is invalid, not expired
                    return next({ message: "Invalid access token", statusCode: 401 });
                }
                // If access token valid but expired, proceed to refresh token logic
            }
        }

        // Access Token is not present or expired but refresh token is there 
        if (refreshToken) 
        {
            try 
            {
                const decodedRefreshToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY);

                // Find user and validate refresh token
                const user = await User.findById(decodedRefreshToken._id).select("+refreshToken");

                // user not found or refresh token not matches 
                if (!user || user.refreshToken !== refreshToken) 
                {
                    return next({ message: "Invalid refresh token", statusCode: 401 });
                }

                // Generate new tokens & save in database and attach to response cookies
                await sendToken(res, user, 200, "accessToken refreshed successfully");

                // Attach user info to the request
                req.user = 
                {
                    _id: user._id,
                    username: user.username,
                };

                return next(); // Proceed after refreshing tokens
            } 
            catch (error) 
            {
                return next({ message: "Invalid or expired refresh token", statusCode: 401 });
            }
        }

        return next({ message: "Authentication failed", statusCode: 401 });
    } 
    catch (error) 
    {
        return next(error);
    }
};

export { isAuthenticated };
