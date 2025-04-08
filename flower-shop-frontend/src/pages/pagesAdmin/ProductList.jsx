import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách sản phẩm</h1>
      <button
        onClick={() => navigate("/admin/products/create")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Thêm sản phẩm
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.price} VNĐ</p>
            <p>{product.stock} SP còn</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
