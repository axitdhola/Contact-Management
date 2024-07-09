const asyncHandler = require('express-async-handler');
const jsonwebtoken = require('jsonwebtoken');

const authenticateUser = asyncHandler(async (req, res, next) => {   
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if(err) {
                res.status(403);
                throw new Error('Not authorized, token failed');
            }
            req.user = decode.user;
            next();
        })
    }
    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = authenticateUser 