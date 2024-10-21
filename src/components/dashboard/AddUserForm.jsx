import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../../services/api";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const AddUserForm = ({ toggleForm, selectedUserData }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
    role: "",
  });

  useEffect(() => {
    if (selectedUserData) {
      setFormData({
        surname: selectedUserData.surname || "",
        othername: selectedUserData.othername || "",
        email: selectedUserData.email || "",
        phone: selectedUserData.phone || "",
        address: {
          street: selectedUserData.address?.street || "",
          town: selectedUserData.address?.town || "",
          country: selectedUserData.address?.country || "",
        },
        password: "",
        role: selectedUserData.role || "",
      });
    }
  }, [selectedUserData]);

  // Handle input changes for all form fields except file input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle input changes for nested address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    const token = localStorage.getItem("authToken");

    const formInputData = new FormData();

    formInputData.append("surname", formData.surname);
    formInputData.append("othername", formData.othername);
    formInputData.append("email", formData.email);
    formInputData.append("phone", formData.phone);
    formInputData.append("address[street]", formData.address.street);
    formInputData.append("address[town]", formData.address.town);
    formInputData.append("address[country]", formData.address.country);
    formInputData.append("password", formData.password);
    formInputData.append("role", formData.role);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (selectedUserData) {
        console.log("Editing User");
        const editUserResponse = await api.put(
          `/users/${selectedUserData._id}`,
          formInputData,
          config
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUserData._id
              ? {
                  ...user,
                  ...editUserResponse.data,
                }
              : user
          )
        );
        toast.success("User Updated successfully");
        toggleForm();
      } else {
        const createUserResponse = await api.post(
          "/users",
          formInputData,
          config
        );
        setUsers([...users, createUserResponse.data]);
        toast.success("User created Successfully");
        toggleForm();
      }
    } catch (error) {
      if (error.request) {
        // Client never received a response, or request never left
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Catch All (e.g., request setup issues)
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000054] flex justify-center items-start w-screen h-screen z-50 overflow-auto">
      <form
        className="flex flex-col gap-2 ml-14 md:ml-0 w-[70%] md:w-1/2 bg-white text-text-primary p-6 mt-[70px] rounded-xl relative"
        onSubmit={handleSubmit}
      >
        <FaTimes
          className="absolute top-3 right-3 text-red text-lg md:text-2xl cursor-pointer"
          onClick={toggleForm}
        />
        <h2 className="text-center font-semibold text-lg md:text-xl mt-1">
          Add User
        </h2>
        <input
          className="outline-none mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleInputChange}
          required
        />
        <input
          className="outline-none mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="othername"
          placeholder="Othername"
          value={formData.othername}
          onChange={handleInputChange}
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="number"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleAddressChange}
          placeholder="Street"
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="town"
          value={formData.address.town}
          onChange={handleAddressChange}
          placeholder="Town"
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="country"
          value={formData.address.country}
          onChange={handleAddressChange}
          placeholder="Country"
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          className="outline-none pt-1.5 mb-3 border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleInputChange}
          required
        />

        <button
          className={`bg-teal-600 w-1/2 p-2 mt-2 mx-auto hover:bg-teal-700 text-lime-50 rounded-xl ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={25} className="mt-1" />
          ) : selectedUserData ? (
            "Update User"
          ) : (
            "Add New User"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddUserForm;
