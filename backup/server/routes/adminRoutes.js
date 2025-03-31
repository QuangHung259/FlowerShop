const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// Middleware kiểm tra quyền Admin
const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
  }
  next();
};

// Thêm sản phẩm
router.post("/products", checkAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật sản phẩm
router.put("/products/:id", checkAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa sản phẩm
router.delete("/products/:id", checkAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Sản phẩm đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duyệt đơn hàng
router.put("/orders/:id/approve", checkAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "processing" },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hủy đơn hàng
router.put("/orders/:id/cancel", checkAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thống kê doanh thu
router.get("/revenue", checkAdmin, async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
