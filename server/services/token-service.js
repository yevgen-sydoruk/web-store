const tokenModel = require("../models/token-model");
const jwt = require("jsonwebtoken");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return rokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
