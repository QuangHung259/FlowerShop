const Payment = require("../models/Payment");
const Order = require("../models/Order");

// [1] Xử lý thanh toán
const processPayment = async (req, res) => {
  try {
    const { orderId, method } = req.body;

    if (!orderId || !method) {
      return res
        .status(400)
        .json({ message: "Thiếu orderId hoặc phương thức thanh toán!" });
    }

    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    if (order.paid) {
      return res
        .status(400)
        .json({ message: "Đơn hàng này đã thanh toán rồi!" });
    }

    // Tạo bản ghi thanh toán
    const payment = new Payment({
      order: order._id,
      user: order.user,
      amount: order.totalAmount,
      method,
      status: "completed", // Giả lập thành công (tùy trường hợp thực tế)
    });

    await payment.save();

    // Cập nhật đơn hàng là đã thanh toán
    order.paid = true;
    await order.save();

    res.status(200).json({
      message: "Thanh toán thành công!",
      orderId: order._id,
      paid: true,
      payment,
    });
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán:", error);
    res.status(500).json({ message: "Lỗi server khi thanh toán", error });
  }
};

module.exports = {
  processPayment,
};
