//  Handing Errors
const errorHandler = (err,req,res,next) => 
{
    
    let message=err.message || "Internal Server Error";
    let statusCode=err.statusCode || 500;
    
    // Handle MongoDB CastError (Invalid ObjectId)
    if (err.name === "CastError" && err.kind === "ObjectId") 
    {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Send  whatever Error is coming to the frontend 
    return res.status(statusCode)
    .json({
        success:false,
        error:message,
    });
}

export default errorHandler;
