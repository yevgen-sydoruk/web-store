const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
const userService = require("../services/user-service");
// const { User, Basket } = require("../models/models"); //postgres

const UserModel = require("../models/user-model");
const UserDto = require("../dto/user-dto");

const { validationResult } = require("express-validator");

// const generateJWT = (id, email, role) => {
//   const accessToken = jwt.sign({ id, email, role }, process.env.SECRET_ACCESS_KEY, {
//     expiresIn: "1h",
//   });
//   const refreshToken = jwt.sign({ id, email, role }, process.env.SECRET_REFRESH_KEY, {
//     expiresIn: "30d",
//   });

//   return { accessToken, refreshToken };
// };

// const saveToken = async (id, refreshToken) => {
//   const tokenData = await tokenModel.findOne({ user: id });
//   if (tokenData) {
//     tokenData.refreshToken = refreshToken;
//     return tokenData.save();
//   }
//   const token = await tokenModel.create({ user: id, refreshToken });
//   return token;
// };

const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

const findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};

// const validateAccessToken = async (token) => {
//   try {
//     const userData = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
//     return userData;
//   } catch (e) {
//     return null;
//   }
// };
const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.SECRET_REFRESH_KEY);
    console.log("JWT verify: ", userData);
    return userData;
  } catch (e) {
    return null;
  }
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error", errors.array()));
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); //httpOnly needed so the cookie cannot be changed in browser with js

      return res.json(userData);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return next(ApiError.badRequest("Validation error", errors.array()));
  //   }
  //   const { email, password, role } = req.body;

  //   if (!email || !password) {
  //     return next(ApiError.badRequest("Incorrect email or password"));
  //   }
  //   const candidate = await UserModel.findOne({ email });
  //   if (candidate) {
  //     return next(ApiError.badRequest("This email is already registered"));
  //   }
  //   const hashPassword = await bcrypt.hash(password, 5);
  //   const user = await UserModel.create({ email, role, password: hashPassword });
  //   // const basket = await Basket.create({ userId: user.id });
  //   const userDto = new UserDto(user); //id, email, role

  //   const tokens = generateJWT({ ...userDto });

  //   await saveToken(userDto.id, tokens.refreshToken);
  //   res.cookie("refreshToken", tokens.refreshToken, {
  //     maxAge: 30 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return res.json({ ...tokens, user: userDto });
  // } catch (e) {
  //   next(ApiError.badRequest(e.message));
  // }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return next(ApiError.internal("User with such name does not exist"));
      }
      let comparePassword = await bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Password is incorrect"));
      }
      const userDto = new UserDto(user); //id, email, role
      const tokens = generateJWT({ ...userDto });
      await saveToken(userDto.id, tokens.refreshToken);
      // const token = generateJWT(user.id, user.email, user.role); Postgres
      // return res.json({ token }); Postgres
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens, user: userDto });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = removeToken(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      if (!refreshToken) {
        next(ApiError.unauthorizedError(e.message));
      }
      const userData = validateRefreshToken(refreshToken);
      const tokenFromDb = await findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        next(ApiError.unauthorizedError(e.message));
      }
      const user = await UserModel.findById(userData.id);
      const userDto = new UserDto(user); //id, email, role
      const tokens = generateJWT({ ...userDto });
      await saveToken(userDto.id, tokens.refreshToken);
      // const token = generateJWT(user.id, user.email, user.role); Postgres
      // return res.json({ token }); Postgres
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens, user: userDto });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      console.log("In userController check method req.user", req.user);
      const token = generateJWT(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new UserController();
