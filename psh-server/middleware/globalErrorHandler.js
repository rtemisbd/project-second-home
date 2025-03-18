const globalErrorHandler = (err, req, res, next)=>{
    const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: err.stack,
  });
}

export default globalErrorHandler