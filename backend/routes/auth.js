const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "Iamragulfromcbit";

//Route 1 : Create a User using : POST "/api/auth/createuser". Doesn't require Auth , No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    //check whether the user with this email exists already

    let success=false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //   .then(user => {console.log(user); res.json(user)}).catch((err)=>{
      //     console.log(err);
      //     res.json({error : "Please enter a unique value for email", message : err.message})
      //   })
      // res.send(req.body)
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({ success, authToken });
    } catch (error) {
      success=false;
      console.log(error.message);
      res.status(500).json({success, error : "Some error occured"});
    }
  }
);

//Route 2 : Authenticate a User using : POST "/api/auth/login". Doesn't require Auth ,  login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success=false;

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      success=false;
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3 : Get logged in user details using : POST "/api/auth/getuser". Doesn't require Auth , No login required
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
