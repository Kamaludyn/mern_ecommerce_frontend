import { useContext } from "react";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaHeadset,
  FaWarehouse,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const menuItems = [
  {
    label: "Overview",
    icon: <FaTachometerAlt />, // Dashboard icon
    route: "/dashboard",
  },
  {
    label: "Users",
    icon: <FaUserFriends />, // User management icon
    route: "/dashboard/users",
  },
  {
    label: "Products",
    icon: <FaBoxOpen />, // Products icon
    route: "/dashboard/products",
  },
  {
    label: "Categories",
    icon: <FaTags />, // Categories icon
    route: "/dashboard/categories",
  },
  {
    label: "Orders",
    icon: <FaShoppingCart />, // Orders icon
    route: "/dashboard/orders",
  },
  {
    label: "Inventory",
    icon: <FaWarehouse />, // Inventory icon
    route: "/dashboard/inventory",
  },
  {
    label: "Support",
    icon: <FaHeadset />, // Support icon
    route: "/dashboard/support",
  },
  {
    label: "Settings",
    icon: <FaCogs />, // Settings icon
    route: "/dashboard/settings",
  },
];

const SideBarNav = ({ isOpen, toggleMenu }) => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div
        className={` ${
          isOpen
            ? "fixed top-[63px] right-0 left-0 transition-all ease-linear duration-150 inset-0 bg-black opacity-50 z-20 md:hidden"
            : "right-[100%]"
        }`}
        onClick={toggleMenu} // Clicking outside the sidebar closes it
      />
      <nav
        className={`${
          isOpen
            ? "bg-teal-200 h-full w-48 md:w-64 fixed top-[62px] group  transition-all duration-300 overflow-hidden z-40  "
            : "bg-teal-200 h-full w-0 md:w-[60px] hover:md:w-64 fixed top-[62px] group transition-all duration-300 overflow-hidden z-40"
        } `}
      >
        <ul className="space-y-2 pr-2 mt-7">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <NavLink
                to={item.route}
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-500 flex items-center gap-x-4 w-full rounded-r-full pl-7 py-1"
                    : "flex items-center gap-x-4 w-full hover:bg-cyan-300 rounded-r-full pl-7 py-1"
                }
              >
                <span className="text-sm md:text-base">{item.icon}</span>
                <span className="text-base transition-all duration-300 cursor-pointer max-w-xs overflow-hidden whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
          <li className="pt-10">
            <button
              className="min-w-full pl-7 py-1 px-3 flex items-center gap-5 rounded-r-full hover:bg-cyan-300"
              onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBarNav;
