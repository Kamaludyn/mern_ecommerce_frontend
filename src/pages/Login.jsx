import api from "../services/api";
import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const userRef = useRef();
  const navigate = useNavigate();

  // useEffect to focus on the email input when the component is rendered
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Accessing form inputs
    const loginForm = e.target;

    // Extracting the email and password from form inputs
    const formData = {
      email: loginForm.loginEmail.value,
      password: loginForm.loginPassword.value,
    };

    try {
      const Login = await api.post("/customers/login", formData);
      // If login is successful, store the token in localStorage
      localStorage.setItem("token", Login.data.accessToken);

      toast.success("Login successful");
      navigate("/profile");
    } catch (error) {
      if (!error.response) {
        // Network error (e.g., no internet connection)
        toast.error("Network Error: Please check your internet connection");
      } else if (error.response.status === 400) {
        // Bad request (e.g., invalid login credentials)
        toast.error(error.response.data.message);
      } else {
        // Catch-all for any other errors
        toast.error("An Error Occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto p-4 py-10 my-20 bg-white shadow-md rounded-md space-y-2"
      >
        <div className="flex items-center w-full">
          <FaEnvelope className="text-text-primary mr-2" />
          <input
            type="email"
            ref={userRef}
            name="loginEmail"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
            disabled={loading}
          />
        </div>

        <div className="flex items-center w-full">
          <FaKey className="text-text-primary mr-2" />
          <input
            type="password"
            name="loginPassword"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-1.5 flex-grow outline-none focus:border-accent"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-accent hover:bg-opacity-90 text-white py-1.5 px-3 rounded-md transition ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div>
          Forgot Password?{" "}
          <Link to="/forgot-password" className="text-accent">
            Click Here!
          </Link>
        </div>
        <div>
          Don't have an Account?{" "}
          <Link to="/create-account" className="text-accent">
            Create Account
          </Link>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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

export default Login;
