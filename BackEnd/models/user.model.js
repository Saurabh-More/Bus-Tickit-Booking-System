import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: 
    {
        type: String,
        required: true,  
        select: false,
    },
    role: { 
        type: String, 
        enum: ["customer", "admin"], 
        default: "customer", 
    },
    refreshToken:
    {
        type:String,
        select:false, 
    }
},{ timestamps: true ,});


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
        next(error);
    }
});

const User = mongoose.models.User || mongoose.model('User',userSchema);

export { User };
