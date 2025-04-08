import { useForm } from "react-hook-form";
import { createCategory } from "../../api/categoryApi";

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createCategory(data);
      alert("Tạo danh mục thành công!");
      reset();
    } catch (err) {
      console.error("Lỗi:", err.response?.data || err.message);
      alert("Tạo thất bại");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-4">
        Thêm danh mục mới
      </h2>

      <label className="block font-medium">Tên danh mục</label>
      <input
        {...register("name", { required: "Tên danh mục là bắt buộc" })}
        placeholder="VD: Hoa tình yêu"
        className="w-full border p-2 rounded"
      />

      <label className="block font-medium">Mô tả</label>
      <textarea
        {...register("description")}
        placeholder="Ghi chú thêm..."
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Lưu danh mục
      </button>
    </form>
  );
};

export default CategoryForm;
