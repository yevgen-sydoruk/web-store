const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), BrandController.create);
router.get("/", BrandController.getAll);

module.exports = router;
