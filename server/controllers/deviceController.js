// const { Device, DeviceInfo } = require("../models/models");
const DeviceModel = require("../models/device-model");
// const DeviceInfoModel = require("../models/deviceInfo-model");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");
// const { where } = require("sequelize");
class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, rating, brandId, typeId, info } = req.body;
      console.log(info);
      info = JSON.parse(info);
      // if (info) {
      //   console.log(device.id);
      //   info = JSON.parse(info);
      //   info.forEach((i) =>
      //     DeviceInfoModel.create({
      //       title: i.title,
      //       description: i.description,
      //       deviceId: device.id,
      //     })
      //   );
      // } else {
      //   info = [];
      // }

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
        info,
      });

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    console.log(limit, page);
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await DeviceModel.paginate({}, { page, limit }).then((result) => {
        return result;
      });
    }
    if (brandId && !typeId) {
      devices = await DeviceModel.paginate({ brandId }, { page, limit }).then((result) => {
        return result;
      });
    }
    if (!brandId && typeId) {
      devices = await DeviceModel.paginate({ typeId }, { page, limit }).then((result) => {
        return result;
      });
    }
    if (brandId && typeId) {
      devices = await DeviceModel.paginate({ typeId, brandId }, { page, limit }).then((result) => {
        return result;
      });
    }
    return res.json(devices);
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest("Id is missing"));
    }
    const device = await DeviceModel.findOne({
      _id: id,
      // include: [{ model: DeviceInfoModel }],
    }).populate("info");
    return res.json(device);
  }
}
module.exports = new DeviceController();
