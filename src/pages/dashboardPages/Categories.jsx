import React, { useState, useEffect, useContext } from "react";
import Spinner from "../../components/Spinner";
import api from "../../services/api";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaExclamationCircle,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { DashboardContext } from "../../context/DashboardContext";
import ClipLoader from "react-spinners/ClipLoader";
import AddCategoryForm from "../../components/dashboard/AddCategoryForm";

const Categories = () => {
  const [categoryInput, setCategoryInput] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { categories, setCategories, loading, error } =
    useContext(DashboardContext);

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
        setOpenInput(false);
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
        setOpenInput(false);
        setCategoryInput("");
        setFormLoading(false);
      }
    }
  };

  // Set edit mode and pre-fill the form with the selected category data
  const handleEdit = (category) => {
    setOpenInput(true);
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

  const handleInputClose = () => {
    setOpenInput(false);
    setEditMode(false);
    setCategoryInput("");
  };

  return (
    <section className="pt-1 text-text-primary">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-h1">Categories</h1>
        <button
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-5 py-3 text-white rounded-md"
          onClick={() => setOpenInput(true)}
        >
          <FaPlus /> Add Category
        </button>
      </div>
      <div className="flex flex-col justify-between gap-7">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center text-rose-500 my-20">
            <FaExclamationCircle className="text-4xl" />
            <span>Check your network Connection</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <div
                id="category-card"
                className="group flex items-center justify-between gap-3 text-medium text-center p-4 md:text-lg bg-orange-300 hover:bg-orange-400 rounded-lg cursor-pointer"
                key={category._id}
              >
                <span>{category.name}</span>
                <div className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in">
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
      </div>
      {openInput && (
        <AddCategoryForm
          handleInputClose={handleInputClose}
          handleSubmit={handleSubmit}
          categoryInput={categoryInput}
          formLoading={formLoading}
          editMode={editMode}
        />
      )}
    </section>
  );
};

export default Categories;
