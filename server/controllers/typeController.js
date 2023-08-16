const { Type } = require("../models/models");
const ApiError = require("../error/apiError");
class TypeController {
  async getAll(req, res) {
    const types = await Type.findAll();
    return await res.json(types);
  }
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  //   async delete(req, res) {
  //     const { name } = req.body;
  //     const type = await Type.delete({ name });
  //     return res.json(type);
  //   }
}
module.exports = new TypeController();
