import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Extract the email value from the form's input field
    const email = e.target.email.value;

    try {
      // Adding email and userType in the reset password request payload
      const response = await api.post("/forgot-password", { email, userType });
      toast.success("Password reset successful");
    } catch (error) {
      // Handling Errors
      toast.error("An Error occured while resetting your password");
    }
  };
  return (
    <section>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select User Type</option>
        <option value="user">User</option>
        <option value="customer">Customer</option>
      </select>
      {message && <p>{message}</p>}
    </section>
  );
};

export default ForgotPassword;
