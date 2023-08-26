// const { Device, DeviceInfo } = require("../models/models");
const DeviceModel = require("../models/device-model");
const DeviceInfoModel = require("../models/device-model");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");
// const { where } = require("sequelize");
class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, rating, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await DeviceModel.create({
        name,
        price,
        rating,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfoModel.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await DeviceModel.find();
      // devices = await DeviceModel.find({ limit, offset });
      console.log("device model without row 1", devices);
    }
    if (brandId && !typeId) {
      devices = await DeviceModel.find({ brandId, limit, offset });
      console.log("device model without row 2", devices);
    }
    if (!brandId && typeId) {
      devices = await DeviceModel.find({ typeId, limit, offset });
      console.log("device model without row 3", devices);
    }
    if (brandId && typeId) {
      devices = await DeviceModel.find({ typeId, brandId, limit, offset });
      console.log("device model without row 4", devices);
    }
    return res.json(devices);
  }
  async getOne(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("Id is missing"));
    }
    const device = await DeviceModel.findOne({
      where: { id },
      include: [{ model: DeviceInfoModel, as: "info" }],
    });
    return res.json(device);
  }
}
module.exports = new DeviceController();
