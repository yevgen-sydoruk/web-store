const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");

router.post("/", BrandController.create);
router.get("/", BrandController.getAll);
router.get("/:id", BrandController.getOne);
router.delete("/:id", BrandController.deleteOne);

module.exports = router;
