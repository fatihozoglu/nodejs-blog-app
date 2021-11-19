const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    await Post.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};
// Update Post
exports.editPost = async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          subtitle: req.body.subtitle,
          author: req.body.author,
          content: req.body.content,
        },
      }
    );
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log(err.message);
  }
};
// Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};
// Home Page
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.render("index", {
      posts,
    });
  } catch (err) {
    console.log(err.messsage);
  }
};
// Edit Page
exports.getEditPage = async (req, res) => {
  try {
    const postToEdit = await Post.findById(req.params.id);
    res.render("edit", {
      postToEdit,
    });
  } catch (err) {
    console.log(err.message);
  }
};
// About Page
exports.getAboutPage = (req, res) => {
  res.render("about");
};
// Add Post Page
exports.getAddPostPage = (req, res) => {
  res.render("add_post");
};
// Post Page
exports.getPostPage = async (req, res) => {
  try {
    const selectedPost = await Post.findById(req.params.id);
    res.render("post", {
      selectedPost,
    });
  } catch (err) {
    console.log(err.message);
  }
};
