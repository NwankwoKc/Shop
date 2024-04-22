class Errorhandle extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = Error.statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail':'error';
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = Errorhandle;