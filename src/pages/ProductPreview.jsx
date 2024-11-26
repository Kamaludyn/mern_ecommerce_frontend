import { useLocation } from "react-router-dom";
import ProdPrevDetailsSection from "../components/ProdPrevDetailsSection";
import ProdPrevImageSection from "../components/ProdPrevImageSection";
import { useEffect, useRef } from "react";

const ProductPreview = () => {
  // Getting the current location object from React Router
  const location = useLocation();

  // Extracting the product data from the location's state
  const { product } = location.state;

  const maxRecentItems = 10;

  // Ensures function only runs once
  const hasSavedRecentlyViewed = useRef(false);

  // Function to save previewed prduct to local storage
  const saveRecentlyViewedItem = (product) => {
    // Retrieve or initialize recent items array from local storage
    let recentItems =
      JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];

    // Remove the product if it already exists in recentItems
    recentItems = recentItems.filter((item) => item._id !== product._id);

    // Add the new product to the beginning of the array
    recentItems.unshift(product);

    // Limit array to max recent items
    if (recentItems.length > maxRecentItems) {
      recentItems = recentItems.slice(0, maxRecentItems);
    }

    // Save the updated list back to localStorage
    localStorage.setItem("recentlyViewedItems", JSON.stringify(recentItems));
  };
  useEffect(() => {
    if (product && !hasSavedRecentlyViewed.current) {
      saveRecentlyViewedItem(product);
      // Prevent multiple calls
      hasSavedRecentlyViewed.current = true;
    }
  }, [product]);
  return (
    <section className="h-full lg:px-20 lg:flex justify-center lg:items-start lg:gap-10 mb-10">
      <ProdPrevImageSection product={product} />
      <ProdPrevDetailsSection product={product} />
    </section>
  );
};

export default ProductPreview;
