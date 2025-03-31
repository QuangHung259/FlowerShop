const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory); // Thêm danh mục mới
router.get("/", getCategories); // Lấy tất cả danh mục
router.get("/:id", getCategoryById); // Lấy danh mục theo ID
router.put("/:id", updateCategory); // Cập nhật danh mục
router.delete("/:id", deleteCategory); // Xóa danh mục

module.exports = router;
