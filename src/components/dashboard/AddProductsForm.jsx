import React, { useState, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardContext } from "../../context/DashboardContext";
import ClipLoader from "react-spinners/ClipLoader";
import AuthContext from "../../context/AuthContext";

const AddProductsForm = ({ toggleForm, selectedRowData, categories }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    category: "",
    isFeatured: false,
    product_image: null,
    gallery_images: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const { products, setProducts } = useContext(DashboardContext);

  const { token } = useContext(AuthContext);

  // Effect to pre-populate form when editing a product (selectedRowData is available)
  useEffect(() => {
    if (selectedRowData) {
      setFormData({
        name: selectedRowData.name || "",
        description: selectedRowData.description || "",
        price: selectedRowData.price || "",
        countInStock: selectedRowData.countInStock || "",
        category: selectedRowData.category?._id || "",
        isFeatured: selectedRowData.isFeatured || false,
        product_image: null,
        gallery_images: null,
      });
    }
  }, [selectedRowData]);

  // Handle input changes for all form fields except file input
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  // Handle file input change (product image)
  const handleFileChange = (e) => {
    setFormData({ ...formData, product_image: e.target.files[0] });
  };

  // Handle gallery images
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      gallery_images: files,
    }));
  };

  // Validate form before submission (ensure positive price and stock count)
  const validateForm = () => {
    const errors = {};
    if (formData.price <= 0) errors.price = "Valid price is required.";
    if (formData.countInStock <= 0)
      errors.countInStock = "Valid stock count is required.";
    return errors;
  };

  // Handle form submission for both adding and updating products
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form and check for errors
    const error = validateForm();
    if (Object.keys(error).length > 0) {
      setFormErrors(error);
      return;
    }

    setLoading(true);

    // Create a FormData object to handle file uploads and form data
    const formInputData = new FormData();

    // Append form fields
    formInputData.append("name", formData.name);
    formInputData.append("description", formData.description);
    formInputData.append("price", formData.price);
    formInputData.append("countInStock", formData.countInStock);
    formInputData.append("category", formData.category);
    formInputData.append("isFeatured", formData.isFeatured);

    // Append file if present
    if (formData.product_image) {
      formInputData.append("product_image", formData.product_image);
    }

    try {
      let productId = null;

      // Editing an existing product
      if (selectedRowData) {
        // Checking if no changes were made
        const areChangesMade =
          selectedRowData.name !== formData.name ||
          selectedRowData.description !== formData.description ||
          selectedRowData.price !== Number(formData.price) ||
          selectedRowData.countInStock !== Number(formData.countInStock) ||
          selectedRowData.category?._id !== formData.category ||
          selectedRowData.isFeatured !== formData.isFeatured ||
          formData.product_image; // Check if a new image is provided

        if (!areChangesMade) {
          toast.info("No changes were made.");
          setLoading(false);
          return;
        }

        const editResponse = await api.put(
          `/products/${selectedRowData._id}`,
          formInputData
        );
        // Update the context with the updated product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedRowData._id
              ? { ...product, ...editResponse.data.product }
              : product
          )
        );

        toast.success("Product updated successfully!");
      } else {
        // Create new product
        const createResponse = await api.post("/products", formInputData);
        productId = createResponse.data.product._id;
        setProducts([...products, createResponse.data]);
        toast.success("Product added successfully!");

        // Upload gallery image(s)
        if (formData.gallery_images.length > 0) {
          const uploadPromises = formData.gallery_images.map((image) => {
            const galleryFormData = new FormData();
            galleryFormData.append("gallery_image", image);
            return api.put(`/products/gallery/${productId}`, galleryFormData, {
              headers: { Authorization: `Bearer ${token}` },
            });
          });

          // Execute all gallery image uploads in parallel.
          const responses = await Promise.all(uploadPromises);
          toast.success("Gallery images uploaded successfully!");
        }
      }
    } catch (error) {
      if (error.message === "Network Error") {
        // Network error
        toast.error("Please check your network connection");
      } else if (error.response?.data.error === "jwt expired") {
        // Expired token error
        toast.error("Session expired: Please login again");
        navigate("/dashboard/login");
      } else {
        // Catch All (e.g., request setup issues)
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      toggleForm();
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000054] flex justify-center items-start w-screen h-screen z-50 overflow-auto">
      <form
        className="flex flex-col gap-1 w-4/5 md:w-1/2 bg-white text-text-primary p-6 mt-[70px] rounded-xl relative"
        onSubmit={handleSubmit}
      >
        <FaTimes
          className="absolute top-3 right-3 text-red text-lg md:text-2xl cursor-pointer"
          onClick={toggleForm}
        />
        <h2 className="text-center font-semibold text-lg md:text-xl mt-1">
          {selectedRowData ? "Edit Product" : "Add Product"}
        </h2>
        <select
          name="category"
          required
          className="outline-none mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700 bg-white"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {!selectedRowData && (
          <>
            <label htmlFor="image" className="font-semibold">
              Add a Product Image
            </label>
            <input
              className="mb-3 border-b-2 border-gray-300 cursor-pointer hover:border-teal-700"
              type="file"
              name="product_image"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="gallery_images" className="font-semibold">
              Add Gallery Images (optional)
            </label>
            <input
              className="border-b-2 border-gray-300 cursor-pointer hover:border-teal-700"
              type="file"
              name="gallery_images"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />
          </>
        )}

        <input
          className="outline-none my-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        {formErrors.price && (
          <p className="text-red text-xs">{formErrors.price}</p>
        )}
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={formData.countInStock}
          onChange={handleInputChange}
          required
        />
        {formErrors.countInStock && (
          <p className="text-red text-xs">{formErrors.countInStock}</p>
        )}
        <label htmlFor="isFeatured">Featured</label>
        <div className="flex gap-2">
          <div>Yes</div>
          <input
            type="radio"
            name="isFeatured"
            value="true"
            checked={formData.isFeatured === true}
            onChange={handleInputChange}
            required
          />
          <div>No</div>
          <input
            type="radio"
            name="isFeatured"
            value="false"
            checked={formData.isFeatured === false}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className={`bg-teal-600 w-1/2 p-2 mt-2 mx-auto hover:bg-teal-700 text-lime-50 rounded-xl ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={18} />
          ) : selectedRowData ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddProductsForm;
