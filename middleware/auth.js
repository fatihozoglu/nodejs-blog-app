const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = null;
  if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    res.status(403).redirect("/login");
    return;
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).redirect("/login");
      return;
    }
  }
};

module.exports = verifyToken;
