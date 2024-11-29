import { useContext } from "react";
import { FaBoxOpen, FaShoppingCart, FaTags, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext";
import AuthContext from "../../context/AuthContext";

const Overview = () => {
  const { counts } = useContext(DashboardContext);

  const { customerCount } = useContext(AuthContext);

  const navigate = useNavigate();

  // Array to hold the card contents for each section of the dashboard
  const cardContents = [
    {
      title: "Customers",
      amount: customerCount,
      icon: <FaUsers />,
      path: "/dashboard/customers",
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
  ];

  return (
    <section className="pt-1 text-text-primary sm:text-lg font-semibold">
      <h1 className="font-bold text-xl my-5">Overview</h1>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 flex-wrap">
        {cardContents.map((content, index) => (
          <div
            className="bg-orange-300 hover:bg-orange-400 p-3 min-w-24 md:min-w-36 rounded-lg cursor-pointer"
            key={index}
            onClick={() => navigate(content.path)}
          >
            <div className="flex justify-between mb-2 md:mb-6">
              <h2>{content.title}</h2>
              {content.icon}
            </div>
            <p className="text-lg md:text-xl">{content.amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
