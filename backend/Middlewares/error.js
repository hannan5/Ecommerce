const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res,  next) =>{
    err.statuscode  = err.statuscode || 500
    err.message = err.message || "Internal Server Error"

    if(err.name === 'CastError'){
        const message = `Resource Not found , invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statuscode).json({
        success:false,
        message: err.message
    })
}
