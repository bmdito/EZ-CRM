const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    create a post
// @access  Public

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-passwod");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      //save new post
      const post = await newPost.save();

      //send as response
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    // create var finds all posts and sorts by date -1 is sort by most recent
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    // req.params.id gets user ID from URL
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    //if there is no post with that id
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    //error object has a kind property, if condition is met it means not a formatted Id
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    // req.params.id gets user ID from URL
    const post = await Post.findById(req.params.id);

    //if there is no post with that id
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //make sure user deleting post owns the post
    //req.user.id is the logged in user
    // to string because post.user is a number
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);
    //error object has a kind property, if condition is met it means not a formatted Id
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/update/:id
// @desc    update an opportunity
// @access  Private

router.put(
  "/update/:id",
  auth,
  //   [auth, [check("user", "user is required").not().isEmpty()]],
  async (req, res) => {
    //check for errors in update
    const errors = validationResult(req);
    //if there are errors send them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { company, location, bio, mainUser } = req.body;

    //build udpate post object
    const updatedPost = {};
    // updatedPost.user = req.user.id;
    updatedPost.text = req.body.text;
    console.log(updatedPost);

    try {
      // req.params.id gets post ID from URL
      const post = await Post.findById(req.params.id);
      console.log(post);

      //if there is no post with that id
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      if (post) {
        // console.log(req.body + "YEET");
        // selector = { _id: req.params.id };
        uppost = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedPost },
          { new: true }
        );
        // console.log(selector + "YEET");
        return res.json(uppost);
      }
    } catch (err) {
      console.error(err.message);
      //error object has a kind property, if condition is met it means not a formatted Id
      if (err.kind == "ObjectId") {
        return res.status(404).json({ msg: "Opportunity not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

//export router
module.exports = router;
