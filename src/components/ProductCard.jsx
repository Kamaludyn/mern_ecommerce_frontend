import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white group mb-2 rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-200 ease-in-out cursor-pointer">
      <img
        className="w-full h-40 p-1 pt-1.5 rounded-t-lg"
        src={product.image.secure_url}
        alt={product.name}
      />
      <div className="flex flex-col gap-2 p-2">
        <p className="truncate">{product.name}</p>
        <p className="font-semibold text-sm">
          <strong>${product.price}</strong>
        </p>
        <button className="text-accent text-sm font-semibold p-1 border border-accent rounded-lg group-hover:text-white group-hover:bg-accent">
          Add <FaCartPlus className="inline ml-1 mb-1" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
