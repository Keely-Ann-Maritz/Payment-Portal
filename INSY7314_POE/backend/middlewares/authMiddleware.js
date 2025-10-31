const jwt = require('jsonwebtoken');
require('dotenv').config();

// create a blacklist of tokens we have invalidated
const tokenBlacklist = new Set();

const verifyToken = (req, res, next) => {
    // strip the header (grab the auth field from the header)
    const authHeader = req.headers.authorization;
    const cookie = req.cookies?.token;
    // we split after the space, as standard auth headers look like the following:
    // Bearer: <token> (and we just want the token aspect)
    let token;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }
    else if(cookie){
        token = cookie;
    }

    // if no token was sent, we return a 401 unauthorized
    if (!token) return res.status(401).json({message: "No token"});

    // if a token that has been logged out, 401 unauthorized
    if (tokenBlacklist.has(token)) return res.status(401).json({message: "Invalidated token"});

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(error){
        res.status(403).json({message: "Expired token!"});
    }
    
};


//this blacklists the token
const invalidateToken = (token) => {
    tokenBlacklist.add(token);
};

module.exports = { verifyToken, invalidateToken };