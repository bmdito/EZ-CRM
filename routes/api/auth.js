const express = require("express");
const router = express.Router();
//require middleware, whenever we want to use it insert it as a parameter in our get request
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("config");

const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/auth
// @desc    Authenticate user and get token
// @access  Public

router.post(
  "/",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //status 400 is a bad response, set errors to a method called array that gives errors in array form
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        // send bad response if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //bcrypt has method called compare to compare a plain script password to an encrypted password

      const isMatch = await bcrypt.compare(password, user.password);

      // if it doesnt match...
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//export router
module.exports = router;
