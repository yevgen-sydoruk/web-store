const BrandModel = require("../models/brand-model");
const ApiError = require("../error/apiError");
class BrandController {
  async getAll(req, res) {
    const brands = await BrandModel.find();
    return await res.json(brands);
  }
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await BrandModel.create({ name });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new BrandController();
