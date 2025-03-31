const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", checkAdmin, createProduct);
router.delete("/:id", checkAdmin, deleteProduct);

module.exports = router;
