const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../Middlewares/generateToken")

const registeruser = asyncHandler(async (req,res) => {
    const { name, email, password, isCreator } = req.body;

    if(!name || !email || !password) {
      res.status(400);
      throw new Eroor("Please enter all the fields.")
    }

    const userExists = await User.findOne({ email });
    if(userExists) {
      res.status(400);
      throw new Error("User Already Exists.");
    }

    const user = await User.create({ name, email, password, isCreator });
    if(user){
      res.status(201).json({ _id: user._id, name: user.name, email: user.email, isCreator: user.isCreator, token: generateToken(user._id), });
    }else{
      res.status(400);
      throw new Error("Failed To Create The User.");
    }
});


const authoriseduser = asyncHandler(async (req,res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if(user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, isCreator: user.isCreator, token: generateToken(user._id), });
      }else{
        res.status(401);
        throw new Error("Invalid Email or Password.");
      }
});


module.exports = { registeruser, authoriseduser };
