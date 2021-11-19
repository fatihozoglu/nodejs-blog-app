const express = require("express");
const mongoose = require("mongoose");
const postController = require("./controllers/postController");

const app = express();

// Connect to MongoDB Database
mongoose.connect(
  "mongodb+srv://fatihozoglu:5Pa7UHzAW2XNk4H@database.nzgt2.mongodb.net/blogProject?retryWrites=true&w=majority"
);

// Setting ejs as a view engine
app.set("view engine", "ejs");
// Using express.static middleware for our static files to be served from 'public' folder
app.use(express.static("public"));
// Using express.urlencoded middleware to encode the url data and parse it
app.use(express.urlencoded({ extended: true }));
// Using express.json() midlleware to get the data and parse it as json
app.use(express.json());

// Create Post
app.post("/add_post", postController.createPost);
// Edit Post
app.post("/edit_post/:id", postController.editPost);
// Delete Post
app.get("/delete_post/:id", postController.deletePost);

// Home Page
app.get("/", postController.getAllPosts);
// About Page
app.get("/about", postController.getAboutPage);
// Add Post Page
app.get("/add_post", postController.getAddPostPage);
// Post Page
app.get("/posts/:id", postController.getPostPage);
// Edit Page
app.get("/posts/edit/:id", postController.getEditPage);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} Portunda başlatıldı.`);
});
