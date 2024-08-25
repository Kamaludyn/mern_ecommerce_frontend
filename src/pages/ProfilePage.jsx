import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-red">
      <h1>Profile Page</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </section>
  );
};

export default ProfilePage;
