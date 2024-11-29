import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UpdateCustomer = ({ closeForm, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  //    Handle input changes for all form fields
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

  // Function to Submit updated customer data to the backend
  const handleUpdate = async (e, rowData) => {
    e.preventDefault();
    setLoading(true);

    const formInputData = {
      surname: formData.surname,
      othername: formData.othername,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData?.address.street,
        town: formData?.address.town,
        country: formData?.address.country,
      },
      password: formData.password,
    };

    try {
      // Send PUT request to update customer data
      const response = await api.put(
        `/customers/${formData._id}`,
        formInputData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedData = response.data.customer;
      toast.success("Customer updated successfully");
      closeForm();
    } catch (error) {
      // Network error
      if (error.message === "Network Error") {
        toast.error("Please check your network connection");
        // Expired token error
      } else if (error.response?.data.error === "jwt expired") {
        toast.error("Session expired: Please login again");
        navigate("/dashboard/login");
      } else {
        // Catch all for any unexpected error
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000054] flex justify-center items-center w-screen h-screen z-50 overflow-auto">
      <form
        onSubmit={handleUpdate}
        className="relative flex flex-col items-center justify-center w-full max-w-sm mt-0 mb-5 mx-auto py-6 px-4 bg-white shadow-md rounded-md space-y-2"
      >
        <FaTimes
          className="absolute text-red text-lg top-[4%] right-[4%] cursor-pointer"
          onClick={closeForm}
        />
        <h1 className="font-semibold text-lg mb-3">Update Customer</h1>
        <div className="flex items-center w-full">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center w-full">
          <input
            type="text"
            name="othername"
            placeholder="Other Name"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData.othername}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center w-full">
          <input
            type="text"
            inputMode="numeric"
            name="phone"
            placeholder="Phone"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData?.address?.street || ""}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="town"
            placeholder="Town"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData?.address?.town || ""}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData?.address?.country || ""}
            onChange={handleAddressChange}
            required
          />
        </div>

        <div className="flex items-center w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center w-full">
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="border-b border-gray-300 p-1.5 flex-grow outline-none focus:border-teal-700 hover:border-teal-700"
            value={formData.password || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-opacity-90 text-white py-3 px-03 transition rounded-md"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={18} className="m-[-3px]" />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </section>
  );
};

export default UpdateCustomer;
