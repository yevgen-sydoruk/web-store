const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dto/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`The user with ${email} email already exists`);
    } //Check if there is no such user in the database, if yes => throw Error
    const hashPassword = await bcrypt.hash(password, 5); //hash the password
    const activationLink = uuid.v4(); //link for activation
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      role: "USER",
    }); //save user to the database
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    ); // send the activation link

    const userDto = new UserDto(user); //id, email, isActivated, role
    const tokens = tokenService.generateTokens({ ...userDto }); //creating tokens for user data transfer object
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    console.log(user);
    if (!user) {
      throw new Error("Incorrect activation link");
    }
    user.isActivated = true;
    await user.save();
  }
}
module.exports = new UserService();
