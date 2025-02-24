import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // name is required
    },
    username: {
        type: String,
        required: true,  // username is required
        unique: true,    // username must be unique
    },
    password: 
    {
        type: String,
        required: true,  // password is required
        select: false,   // Do not include the password by default in query results
    },
    refreshToken:
    {
        type:String,    // Stire the refresh token in the database 
    }
}, 
{ 
    timestamps: true  // Automatically add createdAt and updatedAt fields
});


// Hash password before saving the document if the password is modified
userSchema.pre("save", async function (next) 
{
    // Do not hash the password if it is not modified
    if (!this.isModified("password")) return next();

    // Hash the password using bcrypt
    try 
    {
        this.password = await bcrypt.hash(this.password, 10);  // Hash the password with salt rounds of 10
        next();
    } 
    catch (error) 
    {
        next(error);  // If an error occurs, pass it to the next error middleware
    }
});

// Create a model from the schema
const User = mongoose.models.User || mongoose.model('User',userSchema);

export { User };
