import { useForm } from "react-hook-form";
import { createProduct, uploadImage } from "../../api/productApi";
//import { useNavigate } from "react-router-dom";
//import { useState } from "react";

const ProductForm = () => {
  const { register, handleSubmit } = useForm();
  //const [imageFile, setImageFile] = useState(null);
  //const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      console.log("DATA:", formData);

      let imageUrl = "";

      if (formData.image && formData.image.length > 0) {
        const imageForm = new FormData();
        imageForm.append("image", formData.image[0]);
        const uploadRes = await uploadImage(imageForm);
        imageUrl = uploadRes.data.imageUrl;
        console.log("IMAGE URL:", imageUrl);
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        description: formData.description,
        imageUrl: imageUrl, // ✅ thêm dòng này
      };

      await createProduct(productData);
      alert("Thêm sản phẩm thành công!");
    } catch (err) {
      console.error("❌ BACKEND ERROR:", err.response?.data || err.message);
    }
  };
  console.log("TOKEN GỬI LÊN:", localStorage.getItem("token"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 max-w-lg mx-auto space-y-4"
    >
      <h1 className="text-xl font-bold">Thêm sản phẩm</h1>
      <input
        {...register("name")}
        placeholder="Tên sản phẩm"
        className="w-full border p-2 rounded"
        required
      />
      <input
        {...register("price")}
        type="number"
        placeholder="Giá"
        className="w-full border p-2 rounded"
        required
      />
      <input
        {...register("stock")}
        type="number"
        placeholder="Tồn kho"
        className="w-full border p-2 rounded"
        required
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
      <input
        type="file"
        {...register("image")}
        accept="image/*"
        required
        className="w-full"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Lưu sản phẩm
      </button>
    </form>
  );
};

export default ProductForm;
