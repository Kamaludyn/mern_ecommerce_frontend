import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import api from "../../services/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await api.get("/categories");
        const fetchedCategories = response.data.categories;
        setCategories(fetchedCategories);
        console.log(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle creating or updating a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // If in edit mode, update the selected category
    if (editMode) {
      try {
        const response = await api.put(`/categories/${selectedCategoryId}`, {
          name: newCategory,
        });
        // Update the category in the state
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === selectedCategoryId
              ? { ...category, name: newCategory }
              : category
          )
        );
        setNewCategory("");
        toast.success(`${selectedCategoryId} is updated successfully`);
      } catch (error) {
        toast.error("Category update failed");
      } finally {
        setEditMode(false);
        setNewCategory("");
        setFormLoading(false);
      }
    } else {
      // Create a new category
      try {
        const response = await api.post("/categories", { name: newCategory });
        setNewCategory("");
        setCategories([...categories, response.data.category]);
        toast.success("Category created successfully");
      } catch (error) {
        toast.error("Failed to create category");
      } finally {
        setNewCategory("");
        setFormLoading(false);
      }
    }
  };

  // Set edit mode and pre-fill the form with the selected category data
  const handleEdit = (category) => {
    setEditMode(true);
    setNewCategory(category.name);
    setSelectedCategoryId(category._id);
  };

  // Handle deleting a category
  const handleDelete = async (category) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the product "${category.name}"?`
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/categories/${category._id}`);
      setCategories(categories.filter((cate) => cate._id !== category._id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <section className="pt-1 text-text-primary">
      <h1 className="text-h1 my-5">Categories</h1>
      <div className="flex flex-col justify-between gap-7">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <div
                className="group flex items-center justify-between gap-3 text-medium p-4 pl-10 md:text-lg bg-orange-300 hover:bg-orange-400 rounded-lg cursor-pointer"
                key={category._id}
              >
                <span>{category.name}</span>
                <div className="md:opacity-0 group-hover:opacity-100">
                  <FaEdit
                    className="text-orange-200 hover:text-orange-100 mb-3"
                    onClick={() => handleEdit(category)}
                  />
                  <FaTrash
                    className="text-rose-500 hover:text-rose-700"
                    onClick={() => handleDelete(category)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-self-end"
        >
          <input
            type="text"
            name="category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-1/4 text-center mb-3 border-b-[1px] border-b-gray-300 focus:border-orange-500 hover:border-orange-500 outline-none"
            placeholder="Enter new category name"
          />
          <button
            className={`bg-orange-500 w-1/4 p-2 mx-auto hover:bg-orange-600 text-lime-50 rounded-xl ${
              formLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={formLoading}
          >
            {formLoading
              ? "Creating Category..."
              : editMode
              ? "Edit Category"
              : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Categories;
