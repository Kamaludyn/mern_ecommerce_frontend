import React, { useContext } from "react";
import { FaKey, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const { logoutCstmr, customer } = useContext(AppContext);

  // Function to log out customer
  const handleLogOut = async () => {
    const confirmDelete = confirm("Are you sure you want to logout?");
    if (!confirmDelete) return;
    try {
      const customerId = customer ? customer._id : null;
      if (customerId) {
        await api.post("/customer/logout", customerId);
      }
      logoutCstmr();

      // Redirect customer to login page
      navigate("/login");
    } catch (error) {
      toast.error("An error occured during logging out");
    }
  };

  return (
    <div className="bg-white w-full p-6">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:text-accent cursor-pointer transition-colors duration-200">
          <FaKey className="text-accent text-xl" />
          <button
            onClick={() => navigate("/forgot-password")}
            className="focus:outline-none"
          >
            Reset Password
          </button>
        </li>
        <li className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:text-accent cursor-pointer transition-colors duration-200">
          <FaSignOutAlt className="text-accent text-xl" />
          <button onClick={handleLogOut} className="focus:outline-none">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSettings;
