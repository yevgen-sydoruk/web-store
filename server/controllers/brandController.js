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

  async getOne(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest("Id is missing"));
    }
    const device = await BrandModel.findOne({
      _id: id,
      // include: [{ model: DeviceInfoModel }],
    });
    return res.json(device);
  }

  async deleteOne(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("Id is missing"));
    }
    const device = await BrandModel.deleteOne({
      _id: id,
      // include: [{ model: DeviceInfoModel }],
    });
    return console.log("deleted");
  }
}
module.exports = new BrandController();
