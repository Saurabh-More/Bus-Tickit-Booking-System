import express from "express";
import { Login, Logout, Register, CheckAuth } from "../controllers/Authentication.Controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express.Router();

// Register the User 
app.post("/register",Register);

// Login
app.post("/login",Login);


// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/check-auth",CheckAuth);
app.get("/logout",Logout);

export default app;