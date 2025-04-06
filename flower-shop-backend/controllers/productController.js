const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// [1] Thêm sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Kiểm tra nếu có hình ảnh được upload
    let imageUrl;
    if (req.file) {
      // Lấy đường dẫn URL từ Cloudinary
      imageUrl = req.file.path;
    } else {
      return res.status(400).json({ message: "Hình ảnh là bắt buộc" });
    }

    // Tạo mới sản phẩm
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      imageUrl, // Lưu URL hình ảnh từ Cloudinary
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Sản phẩm đã được thêm!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
  }
};

// [2] Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// [3] Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
};

// [4] Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res
      .status(200)
      .json({ message: "Cập nhật thành công", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
};

// [5] Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
