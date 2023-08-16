const { Device } = require("../models/models");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");
class DeviceController {
  async getAll(req, res) {
    const devices = await Device.findAll();
    return await res.json(devices);
  }
  async getOne(req, res) {}
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      console.log(img);
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new DeviceController();
