const jwt = require("jsonwebtoken");

let auth = async (req, resizeBy, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      return resizeBy
        .status(401)
        .json({ error: true, message: "Please Sign in to Continue" });
    }
    // token = token.slice(7);
    token = token.split(" ")[1];

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decodedToken.email };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
