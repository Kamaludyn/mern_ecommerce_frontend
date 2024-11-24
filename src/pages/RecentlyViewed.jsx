import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const RecentlyViewed = () => {
  const [recentItems, setRecentItems] = useState([]);

  const navigate = useNavigate();

  // Function to fetch recently viewed items
  const fetchRecentlyViewedItems = () => {
    let items = JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];
    setRecentItems(items);
  };

  // useEffect to call fetchRecentlyViewedItems on initial render
  useEffect(() => {
    // Initial fetch
    fetchRecentlyViewedItems();

    // Listen for localStorage changes
    window.addEventListener("storage", fetchRecentlyViewedItems);

    return () => {
      window.removeEventListener("storage", fetchRecentlyViewedItems);
    };
  }, []);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 p-6">
      {recentItems.length > 0 ? (
        recentItems.map((item) => <ProductCard key={item._id} product={item} />)
      ) : (
        <div className="w-[80vw] md:w-[40vw] p-6">
          <p>You haven't viewed any products yet!</p>
          <p className="mt-1 "> Check out our popular items:</p>
          <button
            className="p-3 px-4 font-semibold bg-accent mt-2 text-white rounded-md hover:bg-amber-600"
            onClick={() => navigate("/")}
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
