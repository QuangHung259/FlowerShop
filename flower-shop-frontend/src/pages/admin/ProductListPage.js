import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/productSlice";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h2>Quản lý Sản phẩm</h2>
      <Link to="/admin/products/new">➕ Thêm sản phẩm</Link>
      {loading && <p>Đang tải...</p>}
      {error && <p>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price} VNĐ</td>
              <td>{product.category?.name}</td>
              <td>
                <Link to={`/admin/products/${product._id}/edit`}>✏️ Sửa</Link>
                <button onClick={() => handleDelete(product._id)}>🗑 Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
