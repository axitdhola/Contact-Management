const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
    });
};

module.exports = errorMiddleware;
