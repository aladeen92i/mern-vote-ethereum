const jwt = require('jsonwebtoken');

// decoding token

module.exports = (req, res, next) => {
    if (req.headers['auhtorization']) {        
        const token = req.headers.auhtorization.split(' ')[1]; // token 2nd part of the string separated by a space
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                next(Error('Failed to authenticate the token'));
            } else {
                req.decoded = decoded;
                next();
            } 
        });
    } else {
        next(Error('No token provided'));
    }
}