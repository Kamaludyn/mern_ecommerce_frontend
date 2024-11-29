import React, { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import Spinner from "../../components/Spinner";
import { FaSearch } from "react-icons/fa";
import CustomersDataTable from "../../components/dashboard/CustomersDataTable";
import { toast } from "react-toastify";
import UpdateCustomer from "./UpdateCustomer";

const Customers = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    surname: "",
    othername: "",
    email: "",
    phone: "",
    address: {
      street: "",
      town: "",
      country: "",
    },
    password: "",
  });

  const { token, customers, setCustomers, loading } = useContext(AuthContext);

  // Function to handle deleting a custumer
  const handleDelete = async (rowData) => {
    // Confirm deletion from the user
    const confirmDelete = confirm(
      `Are you sure you want to delete this customer "${
        rowData.surname + " " + rowData.othername
      }"?`
    );
    if (!confirmDelete) return;

    try {
      // Make an API request to delete the customer
      await api.delete(`/customers/${rowData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update customers list by removing the deleted custumer
      setCustomers(
        customers.filter((customer) => customer._id !== rowData._id)
      );
      toast.success("deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete customer. Please try again.");
    }
  };

  // Function to close the update form
  const closeForm = () => {
    setIsOpenForm(false);
  };

  // Function to open the update form and populate it with the selected customer's data
  const openForm = (rowData) => {
    setIsOpenForm(true);
    setFormData(rowData);
  };
  return (
    <section className="w-full overflow-x-clip text-text-primary">
      <header className="pt-8 mb-5">
        <h2 className="text-h1 mb-5">Customers</h2>
        <div className="w-full md:w-[50%] lg-[25%] flex border border-gray-300 items-center px-3 rounded-xl">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for customer..."
            className="w-full p-2 outline-none border-none"
          />
        </div>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <CustomersDataTable
          customers={customers}
          openForm={openForm}
          handleDelete={handleDelete}
        />
      )}
      {isOpenForm && (
        <UpdateCustomer
          handleEdit={handleEdit}
          closeForm={closeForm}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </section>
  );
};

export default Customers;
