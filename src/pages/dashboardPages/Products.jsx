import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import ProductsDataTable from "../../components/dashboard/ProductsDataTable";
import AddProductsForm from "../../components/dashboard/AddProductsForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Effect to fetch products and categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both products and categories simultaneously
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        // Update state with fetched data
        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to toggle the form visibility
  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
    setSelectedRowData(""); // Clear selected product data
  };

  // Function to handle deleting a product
  const handleDelete = async (rowData) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the product "${rowData.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${rowData._id}`); // Send delete request to the API
      // Update products list by removing the deleted product
      setProducts(products.filter((product) => product._id !== rowData._id));
      alert("deleted successfully.");
    } catch (error) {
      alert("Failed to delete product. Please try again.");
    }
  };

  // Function to handle editing a product
  const handleEdit = async (rowData) => {
    setOpenForm(true);
    try {
      // Fetch the specific product data for editing
      const response = await api.get(`/products/${rowData._id}`);
      const fetchedData = response.data.product;
      setSelectedRowData(fetchedData); // Update state with the product data to be edited
    } catch (error) {
      console.error("Error updating product", error.response);
    }
  };

  return (
    <section className="w-full overflow-x-clip">
      <header className="pt-8 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-h1 text-text-primary">Products</h2>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-lime-50 rounded-xl p-2 px-3 flex items-center gap-2"
            onClick={toggleForm}
          >
            <FaPlus />
            Add Product
          </button>
        </div>
        <div className="w-full md:w-[30%] flex border border-gray-300 items-center px-3 rounded-xl">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for Products or Categories..."
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full p-2 outline-none border-none"
          />
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <ProductsDataTable
          products={products}
          globalFilter={globalFilter}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {openForm && (
        <AddProductsForm
          selectedRowData={selectedRowData}
          categories={categories}
          toggleForm={toggleForm}
        />
      )}
    </section>
  );
};

export default Products;
