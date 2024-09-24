import { useLocation } from "react-router-dom";
import ProdPrevDetailsSection from "../components/ProdPrevDetailsSection";
import ProdPrevImageSection from "../components/ProdPrevImageSection";

const ProductPreview = () => {
  // Getting the current location object from React Router
  const location = useLocation();

  // Extracting the product data from the location's state
  const { product } = location.state;
  return (
    <section className="h-full lg:px-20 lg:flex justify-center lg:items-start lg:gap-10 mb-10">
      <ProdPrevImageSection product={product} />
      <ProdPrevDetailsSection product={product} />
    </section>
  );
};

export default ProductPreview;
