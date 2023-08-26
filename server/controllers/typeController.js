// const { Type } = require("../models/models");
const TypeModel = require("../models/type-model");
const ApiError = require("../error/apiError");
class TypeController {
  async getAll(req, res) {
    const types = await TypeModel.find();
    return await res.json(types);
  }
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await TypeModel.create({ name });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new TypeController();
