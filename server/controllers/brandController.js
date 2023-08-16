const { Brand } = require("../models/models");
const ApiError = require("../error/apiError");
class BrandController {
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return await res.json(brands);
  }
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
}
module.exports = new BrandController();
