const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder); // 👈 User đăng nhập mới được tạo đơn
router.get("/:id", authMiddleware, getOrderById); // 👈 Xem đơn theo id - cần login

router.get("/", authMiddleware, isAdmin, getOrders); // 👈 Admin xem tất cả đơn
router.put("/:id", authMiddleware, isAdmin, updateOrderStatus); // 👈 Admin cập nhật
router.delete("/:id", authMiddleware, isAdmin, deleteOrder); // 👈 Admin xóa

module.exports = router;
