const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createOrder); // Tạo đơn hàng mới
router.get("/:id", getOrderById); // Lấy chi tiết đơn hàng

router.get("/", isAdmin, getOrders); // 👈 Chỉ admin xem danh sách đơn hàng
router.put("/:id", isAdmin, updateOrderStatus); // 👈 Chỉ admin cập nhật trạng thái đơn hàng
router.delete("/:id", isAdmin, deleteOrder); // 👈 Chỉ admin được xóa đơn hàng

module.exports = router;
