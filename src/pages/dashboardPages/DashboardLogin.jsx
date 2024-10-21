import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/mernMart-col-logo.webp";
import api from "../../services/api";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const DashboardLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // Function to handle Dashboard login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const loginForm = e.target;

    const formData = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    if (formData.password.length < 6) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/users/login", formData);

      const { accessToken, user } = response.data;

      login(accessToken, user);

      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      if (error.message === "Network Error") {
        // Network error (e.g., no internet connection)
        toast.error("Check your network connection");
      } else if (error.response && error.response.status === 400) {
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
    <div className="min-h-screen bg-cyan-200 flex flex-col justify-center items-center">
      <div className="w-4/5 md:w-full max-w-md bg-white text-text-secondary rounded-lg shadow-lg p-8">
        <img className="w-[50%] mx-auto" src={logo} alt="MertMart-Brand-Logo" />
        <h2 className="font-semibold text-center mb-6">
          Login to access the Dashboard
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 outline-none border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 outline-none border-b-[1px] border-b-gray-300 focus:border-teal-700 hover:border-teal-700"
              required
            />
          </div>
          {error && (
            <div className="text-sm text-rose-600">
              Password must be at least 6 characters long
            </div>
          )}

          <button
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-500"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={18} /> : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-text-primary">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default DashboardLogin;
