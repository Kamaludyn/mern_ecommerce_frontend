import React from "react";

const ForgotPassword = () => {
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
    </section>
  );
};

export default ForgotPassword;
