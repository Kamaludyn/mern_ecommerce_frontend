import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaAddressBook,
  FaEnvelope,
  FaKey,
  FaPortrait,
  FaUserCircle,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import api from '../services/api';
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef();

  const navigate = useNavigate();

  // useEffect to focus on the surname input when the component is rendered
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Function to toggle password visibility between text and password type
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle account creation form submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Accessing form inputs
    const createAcctForm = e.target;

    // Extracting the form data from input fields
    const formData = {
      surname: createAcctForm.surname.value,
      othername: createAcctForm.othername.value,
      email: createAcctForm.email.value,
      phone: createAcctForm.phone.value,
      address: createAcctForm.address.value,
      password: createAcctForm.password.value,
    };

    try {
      // Sending a POST request to create an account
      const response = await api.post("/customers",
        formData
      );
      toast.success("Account created successfully");
      navigate("/profile");
      // Reset the form after submission
      createAcctForm.reset();
    } catch (error) {
      // Network error (e.g., no internet connection)
      if (!error.response) {
        // Network error (no response from server)
        toast.error("Network Error: Please check your internet connection");
      } else if (error.response.status === 400) {
        // Bad request (e.g., invalid data)
        toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        if (error.response.data.message.includes("phone")) {
          // Conflict (e.g., phone number already exists)
          toast.error(error.response.data.message);
        } else if (error.response.data.message.includes("email")) {
          // Conflict (e.g., email number already exists)
          toast.error(error.response.data.message);
        }
      } else {
        // Catch-all for any other errors
        toast.error("An error occured");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleCreateAccount}
        className="flex flex-col items-center justify-center w-full max-w-sm mt-0 mb-5 mx-auto py-6 px-4 bg-white shadow-md rounded-md space-y-2"
      >
        <div className="flex items-center w-full">
          <FaUserCircle className="text-text-primary mr-2" />
          <input
            type="text"
            ref={userRef}
            name="surname"
            placeholder="Surname"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <FaPortrait className="text-text-primary mr-2" />
          <input
            type="text"
            name="othername"
            placeholder="Other Name"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <FaPhone className="text-text-primary mr-2" />
          <input
            type="text"
            inputMode="numeric"
            name="phone"
            placeholder="Phone"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <FaAddressBook className="text-text-primary mr-2" />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <FaEnvelope className="text-text-primary mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <FaKey className="text-text-primary mr-2" />
          <div className=" w-full flex pr-2 border border-gray-300 rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="p-1.5 flex-grow outline-none focus:border-accent"
              required
            />
            <span
              className="ml-2 text-xl cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="mt-2 text-text-secondary" />
              ) : (
                <FaEye className="mt-2 text-text-secondary" />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-start w-full">
          <input type="checkbox" className="mr-1.5" name="terms" required />
          <div className="text-sm">
            Agree to the <strong>Terms & Conditions</strong> and{" "}
            <strong>Privacy Policy</strong>.
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-opacity-90 text-white py-1.5 px-3 rounded-md transition"
        >
          Create Account
        </button>

        <div className="text-sm">
          Already have an account?{" "}
          <Link to={"/Login"} className="text-accent font-semibold">
            Log in
          </Link>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default CreateAccount;
