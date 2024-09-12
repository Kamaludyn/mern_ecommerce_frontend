import React from "react";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaHeadset,
  FaWarehouse,
  FaCogs,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

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

const SideBarNav = ({ isOpen }) => {
  return (
    <nav
      className={`
      bg-teal-200 h-full w-16 hover:w-48 md:w-16 hover:md:w-64 group transition-all duration-300 overflow-hidden fixed top-[63px] left-0 z-40 ${
        isOpen ? "w-48 md:w-64 hover:md:w-64 overflow-hidden" : ""
      } `}
    >
      <ul className="space-y-2 pr-2 mt-7">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center ">
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
              <span
                className={`${
                  isOpen
                    ? "max-w-xs overflow-hidden whitespace-nowrap"
                    : "max-w-0"
                }text-base whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 cursor-pointer`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBarNav;
