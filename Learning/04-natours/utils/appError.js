class AppError extends Error{
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail':'error';
        this.isOperational = true; // this type of error are related to express and db connectivity errors
        
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;