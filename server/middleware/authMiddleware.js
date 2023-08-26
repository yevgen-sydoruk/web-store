const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log(req.method);
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(req.method, "here");
    res.status(401).json({ message: "Not authorized" });
  }
};
