const express = require("express");
const mongoose = require("mongoose");
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");
require("dotenv").config();
const authn = require("./middleware/auth");

const app = express();

// Connect to MongoDB Database
mongoose.connect(process.env.DB_CONNECTION);

// Setting ejs as a view engine
app.set("view engine", "ejs");
// Using express.static middleware for our static files to be served from 'public' folder
app.use(express.static("public"));
// Using express.urlencoded middleware to encode the url data and parse it
app.use(express.urlencoded({ extended: true }));
// Using express.json() midlleware to get the data and parse it as json
app.use(express.json());

// Create Post
app.post("/add_post", authn, postController.createPost);
// Edit Post
app.post("/edit_post/:id", authn, postController.editPost);
// Delete Post
app.get("/delete_post/:id", authn, postController.deletePost);

// Register User
app.post("/register", userController.register);
// Login
app.post("/login", userController.login);

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
// Register Page
app.get("/register", userController.getRegisterPage);
// Login Page
app.get("/login", userController.getLoginPage);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} Portunda başlatıldı.`);
});
