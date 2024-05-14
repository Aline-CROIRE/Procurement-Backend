
// Import necessary modules
const bcrypt = require('bcrypt');
const User = require('../model/Auth/Auth.model');

// Controller methods
const UserController = {
  // Get all contacts
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },

  // Create a new contact
  createUser: async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Create a new user object with hashed password
        const newUser = new User({
            name:req.body.name,
          email: req.body.email,
            password: hashedPassword,
          role:req.body.role
          // Other user properties
        });
    
        // Save the new user
        const savedUser = await newUser.save();
    
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
  },

  // Update a contact by ID
  updateUser: async (req, res) => {
    const { id } = req.query;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  },

  // Delete a contact by ID
  deleteUser: async (req, res) => {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  },
};
module.exports= UserController;
