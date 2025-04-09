//pages/pagesAdmin/ProductEdit.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProductById, updateProduct } from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then((res) => {
      const product = res.data;
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("description", product.description);
      setValue("category", product.category?._id || "");
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    await updateProduct(id, data);
    navigate("/admin/products");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 max-w-lg mx-auto space-y-4"
    >
      <h1 className="text-xl font-bold">Sửa sản phẩm</h1>
      <input
        {...register("name")}
        placeholder="Tên sản phẩm"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("price")}
        type="number"
        placeholder="Giá"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("stock")}
        type="number"
        placeholder="Tồn kho"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("category")}
        placeholder="ID danh mục"
        className="w-full border p-2 rounded"
      />
      <textarea
        {...register("description")}
        placeholder="Mô tả"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Cập nhật
      </button>
    </form>
  );
};

export default ProductEdit;
