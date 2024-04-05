
const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET="RishantJwt@";
router.post('/createuser', [
  body('name', 'Enter Name').notEmpty(),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "Sorry, a user with this email already exists" });
    }
    
     const pass=req.body.password;
     const salt=await bcrypt.genSalt(10);
     const SecPass=await bcrypt.hash(pass,salt);

    let newUser = await User.create({
      name: req.body.name,
      password: SecPass,
      email: req.body.email
    });
    
    const data={
      id: newUser.id
    }
    // Send a response back to the client indicating success
    const jwtData= jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,jwtData});
  } catch (error) {
    console.error(error);
    res.status(500).json({success, error: 'An error occurred while creating the user.' });
  }



});

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
   }

    const { email, password } = req.body;  
    try {
      const user = await User.findOne({ email }); 
      if (!user) {
        return res.status(400).json({ error: "Enter Correct Details" });
      }
      var success;
      const passCompare = await bcrypt.compare(password, user.password); 
      if (!passCompare) {
        success=false;
        return res.status(400).json({ success,error: "Enter Correct Details" });
      }

      const data = {
        id: user.id // Corrected: user.id
      }

      const jwtData = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,jwtData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Error' });
    }
});

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    if (!req.user) {
      console.log('User data not found'); // Log message if user data is not found
      return res.status(404).json({ error: "User data not found in request" });
    }

    const userId = req.user;
    // console.log('User ID:', userId); // Log user ID for debugging

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Send the user data in the response body
    res.status(200).json(user);
  } catch (error) {
    // console.error('Error:', error); // Log any errors that occur
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
