const { Type } = require("../models/models");
const ApiError = require("../error/apiError");
class TypeController {
  async getAll(req, res) {
    const types = await Type.findAll();
    return await res.json(types);
  }
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new TypeController();
