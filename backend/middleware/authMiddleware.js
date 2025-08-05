const jwt = require('jsonwebtoken');

const protect = async (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if(!token){
        res.status(401).json({message: "User is not authorized"});  
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = decoded; // storing user details in req.user object
        next(); // Move to the next middleware or route handler
    }catch(error){
        res.status(401).json({message: "User is not authorized"});
    }

};

module.exports = {protect};
