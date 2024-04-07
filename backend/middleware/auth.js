const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split('')[1];
        const decodedtoken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const authId = decodedtoken.authId;
        req.auth = {
            authId: authId,
        };
    next();

    } 
    catch (error){
        res.status(401).json({message: 'mid bug'});
    }
};