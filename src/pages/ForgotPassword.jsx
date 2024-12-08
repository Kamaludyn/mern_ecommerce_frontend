import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Extract the email value from the form's input field
    const email = e.target.email.value;

    try {
      // Adding email and userType in the reset password request payload
      const response = await api.post("/forgot-password", {
        email,
        userType: "customer",
      });
      setMessage(response.data.message);
      toast.success("A reset password link has been sent to your email");
    } catch (error) {
      // Handling Errors
      toast.error("An Error occured while resetting your password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="max-w-md mx-auto p-6 pt-6 mt-6 mb-10 bg-white rounded-lg shadow-uShape border border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-text-primary">
        Forgot Password
      </h2>
      <form onSubmit={handleResetPassword} className="space-y-4 mb-3">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-accent hover:border-accent"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-90 transition duration-300"
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={18} className="m-[-3px]" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
      {message && <p className="  text-center text-text-primary">{message}</p>}
    </section>
  );
};

export default ForgotPassword;
