//pages/pagesAdmin/CategoryList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../api/categoryApi";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });

  const fetchData = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá?")) {
      await deleteCategory(id);
      fetchData();
    }
  };

  const handleUpdate = async (id) => {
    await updateCategory(id, editData);
    setEditingId(null);
    fetchData();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
        <button
          onClick={() => navigate("/admin/categories/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm danh mục
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border p-3 rounded flex justify-between items-start"
          >
            {editingId === cat._id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <button
                  onClick={() => handleUpdate(cat._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-bold">{cat.name}</p>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(cat._id);
                      setEditData({
                        name: cat.name,
                        description: cat.description,
                      });
                    }}
                    className="text-blue-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-500"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
