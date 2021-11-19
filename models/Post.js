const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Schema for Post
const PostSchema = new Schema({
  title: String,
  subtitle: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Create a model for Post by using PostSchema
const Post = mongoose.model("Post", PostSchema);

// Export Post model
module.exports = Post;
