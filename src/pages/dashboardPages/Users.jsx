import React, { useContext, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import UsersDataTable from "../../components/dashboard/UsersDataTable";
import AddUserForm from "../../components/dashboard/AddUserForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Users = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});

  const navigate = useNavigate();

  const { token, users, setUsers } = useContext(AuthContext);

  // Function to toggle the visibility of the AddUserForm
  const toggleForm = () => {
    setOpenForm(!openForm);
    setSelectedUserData("");
  };

  // Function to update User
  const handleEdit = async (rowData) => {
    setOpenForm(true);
    try {
      if (!token) {
        toast("You need to Login");
        navigate("/dashboard/login");
      }

      const editRes = await api.get(`/users/${rowData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const editData = editRes.data.user;
      setSelectedUserData(editData);
    } catch (error) {
      // Handle unauthorized or session expiration
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/dashboard/login");
        toast.error(
          "Your session has expired or unauthorized. Please log in again."
        );
      } else {
        toast.error("Failed to edit product. Please try again.");
      }
    }
  };

  // Function to delete a user
  const handleDelete = async (rowData) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete this user "${rowData.surname} ${rowData.othername}"?`
    );
    if (!confirmDelete) return;

    try {
      // Send a delete request to the API
      await api.delete(`/users/${rowData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update users state by removing the deleted user
      setUsers(users.filter((users) => users._id == rowData._id));
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };
  return (
    <section className="w-full overflow-x-clip text-text-primary">
      <header className="pt-8 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-h1">Users</h2>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-lime-50 rounded-xl p-2 px-3 flex items-center gap-2"
            onClick={toggleForm}
          >
            <FaPlus />
            Add New User
          </button>
        </div>
        <div className="w-full md:w-[50%] lg-[25%] flex border border-gray-300 items-center px-3 rounded-xl">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for Products or Categories..."
            className="w-full p-2 outline-none border-none"
          />
        </div>
      </header>
      {users?.lenght === 0 ? (
        <Spinner />
      ) : (
        <UsersDataTable
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {openForm && (
        <AddUserForm
          selectedUserData={selectedUserData}
          toggleForm={toggleForm}
        />
      )}
    </section>
  );
};

export default Users;
