const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getRegisterPage = (req, res) => {
  res.render("register");
};

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      res.status(400).redirect("/register");
    }

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      res.status(409).redirect("/login");
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      res
        .status(201)
        .cookie("x-access-token", token, {
          expires: new Date(Date.now() + 3600000), // cookie will be removed after 1 hours
          httpOnly: true,
        })
        .redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).redirect("/login");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      res
        .status(201)
        .cookie("x-access-token", token, {
          expires: new Date(Date.now() + 3600000), // cookie will be removed after 1 hours
          httpOnly: true,
        })
        .redirect("/");
    } else {
      res.status(400).redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
};
