const jwt = require('jsonwebtoken');    

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if(!token) return res.status(401).json({message: "Auth Error backend"});

    try{
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract token from "Bearer <token>"
        req.user = verified; // Attach user info to request
        next(); // Move to next middleware if any
    } catch(err){
        res.status(400).json({message: "Token is not valid"});
    };
};

module.exports = authMiddleware;