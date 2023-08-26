const jwt = require("jsonwebtoken");
const ApiError = require("../error/apiError");

const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    return userData;
  } catch (e) {
    return null;
  }
};

module.exports = function (req, res, next) {
  console.log(req.method);

  try {
    const tokenAuthorizationHeader = req.headers.authorization;
    if (!tokenAuthorizationHeader) {
      return next(ApiError.unauthorizedError());
    }
    const accessToken = tokenAuthorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }
    // const decoded = jwt.verify(tokenAuthorizationHeader, process.env.SECRET_KEY); Postgres
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorizedError());
  }
};
