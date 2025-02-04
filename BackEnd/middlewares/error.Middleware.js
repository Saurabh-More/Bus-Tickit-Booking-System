//  Handing Errors
const errorHandler = (err,req,res,next) => 
{
    
    const message=err.message || "Internal Server Error";
    const statusCode=err.statusCode || 500;

    // Send  whatever Error is coming to the frontend 
    return res.status(statusCode)
    .json({
        success:false,
        error:message,
    });
}

export default errorHandler;
