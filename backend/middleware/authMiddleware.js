const jwt = require('jsonwebtoken');

const protect = async (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "User is not authorized - No token provided" });
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "User is not authorized"});  
    }
    //console.log("Received token:", token); // Debug log
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = decoded; // storing user details in req.user object
        next(); // Move to the next middleware or route handler
    }catch(error){
        return res.status(401).json({message: "User is not authorized"});
    }

};

module.exports = {protect};
