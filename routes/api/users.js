const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// @route   Post api/users
// @desc    Register user
// @access  Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check(
      "password",
      "please enter a password of at least 6 characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //status 400 is a bad response, set errors to a method called array that gives errors in array form
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);

//export router
module.exports = router;
