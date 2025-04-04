// src/pages/ProductManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const { data } = await axios.post("/api/products", newProduct);
      setProducts([...products, data]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
      });
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-center my-5">Quản lý Sản Phẩm</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Thêm Sản Phẩm</h3>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Tên sản phẩm"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Mô tả sản phẩm"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Giá sản phẩm"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            placeholder="Số lượng sản phẩm"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            placeholder="URL hình ảnh sản phẩm"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Thêm Sản Phẩm
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold">Danh Sách Sản Phẩm</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id} className="border-b py-2">
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{product.price} VNĐ</div>
                <div>{product.stock} sản phẩm còn lại</div>
                {/* Thêm các nút sửa, xóa sản phẩm tại đây */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
