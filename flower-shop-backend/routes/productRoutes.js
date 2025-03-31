const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Định nghĩa route API đúng

router.get("/", getProducts); // Lấy danh sách sản phẩm
router.get("/:id", getProductById); // Lấy chi tiết sản phẩm

router.post("/", isAdmin, createProduct); // 👈 Chỉ admin được thêm sản phẩm
router.put("/:id", isAdmin, updateProduct); // 👈 Chỉ admin được cập nhật
router.delete("/:id", isAdmin, deleteProduct); // 👈 Chỉ admin được xóa

module.exports = router;
