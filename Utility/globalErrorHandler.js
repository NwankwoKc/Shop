module.exports = (error,req,res,next) =>{
    console.log(error);
    //Set an appropreiate status code for the error
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'fail'
    error.message = error.message || 'Internal server Error'
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    })
}