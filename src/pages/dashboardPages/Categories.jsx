import React, { useState, useEffect, useContext } from "react";
import Spinner from "../../components/Spinner";
import api from "../../services/api";
import { toast } from "react-toastify";
import { FaEdit, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { DashboardContext } from "../../context/DashboardContext";

const Categories = () => {
  // const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // const [error, setError] = useState(false);

  const { categories, setCategories, loading, error } =
    useContext(DashboardContext);

  // // Fetch categories from the API when the component mounts
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get("/categories");
  //       const fetchedCategories = response.data.categories;
  //       setCategories(fetchedCategories);
  //       console.log(fetchedCategories);
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // Handle creating or updating a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // If in edit mode, update the selected category
    if (editMode) {
      try {
        const response = await api.put(`/categories/${selectedCategoryId}`, {
          name: categoryInput,
        });
        // Update the category in the state
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === selectedCategoryId
              ? { ...category, name: categoryInput }
              : category
          )
        );
        setCategoryInput("");
        toast.success(`Category updated successfully`);
      } catch (error) {
        toast.error("Category update failed");
      } finally {
        setEditMode(false);
        setCategoryInput("");
        setFormLoading(false);
      }
    } else {
      // Create a new category
      try {
        const response = await api.post("/categories", { name: categoryInput });
        setCategoryInput("");
        setCategories([...categories, response.data.category]);
        toast.success("Category created successfully");
      } catch (error) {
        toast.error("Failed to create category");
      } finally {
        setCategoryInput("");
        setFormLoading(false);
      }
    }
  };

  // Set edit mode and pre-fill the form with the selected category data
  const handleEdit = (category) => {
    setEditMode(true);
    setCategoryInput(category.name);
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
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center text-rose-500 my-20">
            <FaExclamationCircle className="text-4xl" />
            <span>Check your network Connection</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <div
                id="category-card"
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
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="w-[55%] md:w-1/3 text-center mb-3 border-b-[1px] border-b-gray-300 focus:border-orange-500 hover:border-orange-500 outline-none"
            placeholder="Enter new category name"
            required
          />
          <button
            className={`bg-orange-500 w-2/5 md:w-1/4 p-2 mx-auto hover:bg-orange-600 text-lime-50 rounded-xl ${
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
