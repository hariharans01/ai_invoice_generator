const jwt = require("jsonwebtoken");
const User = require("../models/User");

//helper-generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

//@desc register new user
//@route POST /api/auth/register
//@access public

exports.registerUser = async (req, res)=> {
    const {name,email,password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({message:"please fill all fields"});
        }

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }

        //create user
        const user = await User.create({name,email,password});

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
            else{
                res.status(400).json({message: "Invalid user data"});
            }
        
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};

//@desc login new user
//@route POST /api/auth/login
//@access public
 exports.loginUser = async(req,res) => {
    const {email,password} = req.body;
    
    try{
        const user = await User.findOne({email}).select("+password");
        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),

                businessName: user.businessName || "",
                address: user.address || "",
                phone: user.phone || "",
            });
        }  else {
                res.status(401).json({message: "Invalid credentials"});
            }
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
 }

//@desc rget current logged in user
//@route POST /api/auth/me
//@access private
exports.getMe = async (req,res) => {
    try{
        
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};


//@desc update user profile
//@route POST /api/auth/me
//@access private
exports.updateUserProfile = async (req,res) => {
    try{
        
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};

