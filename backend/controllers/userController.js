const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// Register user
exports.registerUser = async (req,res)=>{
    try{
        const {Fname,Lname,email,password,phone} = req.body;
        let userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});  
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password,10);

        // Create user
        const newUser = new User({Fname,Lname,email,password:hasedPassword,phone});
        await newUser.save();

        res.status(201).json({message: "User created successfully"});   

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

// Login user

exports.LoginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User does not exist"});  
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"});  
        }   

        // Generate JWT token
        const token = jwt.sign({id: user._id, Fname: user.Fname, Lname: user.Lname}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: "Login successful",user, token});
        
    }catch(error){
        res.status(500).json({message: "error logging in"},error);
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { Fname, Lname, email, phone } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.Fname = Fname;
        user.Lname = Lname;
        user.phone = phone;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(400).json({ message: "Same Password" });
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password,10);

        // Update user information
        user.password = hasedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.updateUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }
        
//         // Update username
//         user.username = username;
//         await user.save();
        
//         res.status(200).json({ message: "Username updated successfully", user });
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.deleteUser = async (req, res) => {
    try {
        const {email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        
        // delete user
        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.userList = async (req,res)=>{
    try{
        const user = await User.find({},{email:1,password:1,username:1,_id:0}); // Fetching only email, password, and username fields

        if(!user){
            return res.status(400).json({message: "No Data Available"});  
        }  

        res.status(200).json({message: "List Of Users : ",user});
    
    }catch(error){
        res.status(500).json({message: "error fetching data"},error);
    }
};