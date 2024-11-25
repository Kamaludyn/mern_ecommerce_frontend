import { Outlet, NavLink } from "react-router-dom";
import {
  FaCogs,
  FaEye,
  FaShoppingBag,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
  const { customer } = useContext(AppContext);

  const listItems = [
    {
      label: "My Profile",
      icon: <FaUser className="md:mr-2 text-2xl text-center text-accent " />,
      route: "/profile",
    },
    {
      label: "My Orders",
      icon: <FaShoppingBag className="md:mr-2 text-2xl text-accent " />,
      route: "/profile/my-orders",
    },
    {
      label: "Recently Viewed",
      icon: <FaEye className="md:mr-2 text-2xl text-accent " />,
      route: "/profile/recently-viewed",
    },
    {
      label: "Settings",
      icon: <FaCogs className="md:mr-2 text-2xl text-accent " />,
      route: "/profile/settings",
    },
  ];
  return (
    <section className="min-h-screen text-sm md:text-base flex flex-col md:flex-row justify-between items-center md:gap-2 md:items-stretch md:px-[8%] shadow-lg">
      <section
        id="aside"
        className="bg-gray-300 flex flex-col items-center w-11/12 md:w-[45%] lg:w-[33%] p-4 md:shadow-md rounded-t-md md:rounded-lg relative"
      >
        <div className="flex flex-col gap-2 items-center font-[600] mb-14">
          <FaUserCircle className="mr-2 text-6xl text-white" />
          <h1 className="text-2xl font-semibold text-text-primary px-3 text-center pb-2 md:pb-0">
            Hello, {customer.othername} {customer.surname}
          </h1>
        </div>
        <ul className="absolute top-[70%] md:static md:min-h-[70vh] bg-white w-11/12 flex md:items-start items-center justify-between md:justify-normal md:gap-3 md:flex-col font-[600] p-2 shadow-uShape rounded-md">
          {listItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-accent md:w-full border-2 border-accent rounded-md"
                  : "md:w-full border-2 border-transparent rounded-md"
              }
            >
              <li className=" md:w-full flex flex-col md:flex-row  items-center gap-2 hover:text-accent text-center cursor-pointer p-2">
                {item.icon}
                {item.label}
              </li>
            </NavLink>
          ))}
        </ul>
      </section>
      <section className="w-11/12 md:w-[55%] lg:w-[65%] min-h-screen h-full p-4 pt-20 md:pt-0 bg-white md:rounded-lg overflow-y-auto shadow-xl">
        <Outlet />
      </section>
    </section>
  );
};

export default ProfilePage;
