import { useContext } from "react";
import {
  FaBoxOpen,
  FaHeadset,
  FaShoppingCart,
  FaTags,
  FaUserFriends,
  FaWarehouse,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext";

const Overview = () => {
  const { counts } = useContext(DashboardContext);

  const navigate = useNavigate();

  // Array to hold the card contents for each section of the dashboard
  const cardContents = [
    {
      title: "Users",
      amount: 0,
      icon: <FaUserFriends />,
      path: "/dashboard/users",
    },
    {
      title: "Products",
      amount: counts.productCount,
      icon: <FaBoxOpen />,
      path: "/dashboard/products",
    },
    {
      title: "Categories",
      amount: counts.categoryCount,
      icon: <FaTags />,
      path: "/dashboard/categories",
    },
    {
      title: "Orders",
      amount: 0,
      icon: <FaShoppingCart />,
      path: "/dashboard/orders",
    },
    {
      title: "Inventory",
      amount: 0,
      icon: <FaWarehouse />,
      path: "/dashboard/inventory",
    },
    {
      title: "Support",
      amount: 0,
      icon: <FaHeadset />,
      path: "/dashboard/support",
    },
  ];

  return (
    <section className="pt-1 text-text-primary">
      <h1 className="font-bold text-xl my-5">Overview</h1>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 flex-wrap">
        {cardContents.map((content, index) => (
          <div
            className="bg-orange-300 hover:bg-orange-400 p-3 min-w-28 md:min-w-36 rounded-lg cursor-pointer"
            key={index}
            onClick={() => navigate(content.path)}
          >
            <div className="flex justify-between mb-2 md:mb-6">
              <h2 className="font-semibold">{content.title}</h2>
              {content.icon}
            </div>
            <h1>{content.amount}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
