const Order = require("../models/Order");

// [1] Thêm đơn hàng mới
const createOrder = async (req, res) => {
  try {
    console.log("User ID nhận được:", req.body.user);
    console.log("Products nhận được:", req.body.products);

    const { user, products, totalAmount, shippingAddress } = req.body;

    if (!user || !products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "Thiếu dữ liệu đầu vào!" });
    }

    const newOrder = new Order({
      user,
      products,
      totalAmount,
      shippingAddress,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Đơn hàng đã được tạo!", order: newOrder });
  } catch (error) {
    console.error("LỖI KHI TẠO ĐƠN HÀNG:", error);
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error });
  }
};

// [2] Lấy danh sách đơn hàng
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .populate({
        path: "products.product",
        select: "name price",
        match: { _id: { $exists: true } }, // Chỉ lấy sản phẩm hợp lệ
      });

    if (!orders.length) {
      return res.status(404).json({ message: "Không có đơn hàng nào" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// [3] Lấy chi tiết đơn hàng
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "fullName email")
      .populate({
        path: "products.product",
        select: "name price",
        match: { _id: { $exists: true } }, // Chỉ lấy sản phẩm tồn tại
      });

    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error });
  }
};

// [4] Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res
      .status(200)
      .json({ message: "Cập nhật thành công", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error });
  }
};

// [5] Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ message: "Xóa đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error });
  }
};

// ✅ Chỉ export 1 lần, sau khi khai báo tất cả hàm
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
