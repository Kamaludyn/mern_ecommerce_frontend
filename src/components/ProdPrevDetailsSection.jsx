import React from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const ProdPrevDetailsSection = ({ product }) => {
  return (
    <section className="flex flex-col justify-center md:h-full text-text-primary mx-5 gap-5 mt-2 lg:mt-0 lg:w-[35%]">
      <h2 className="text-xl font-semibold ">{product.name}</h2>
      <p className="">{product.description}</p>

      <p className="">
        <strong> ${product.price}</strong>
      </p>

      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-between items-center p-2 border-[2px] rounded-lg">
          <FaPlus className="text-xl hover:text-accent cursor-pointer" />
          <input
            className="w-[70%] bg-bg text-center font-semibold outline-none border-none"
            type="text"
            inputMode="numeric"
          />
          <FaMinus className="text-xl hover:text-accent cursor-pointer" />
        </div>

        <button
          className="bg-accent rounded-lg w-full text-center text-white font-semibold p-3 hover:bg-amber-600"
          id="add-btn"
        >
          Add to cart
          <FaShoppingCart className="inline ml-2" />
        </button>
      </div>
    </section>
  );
};

export default ProdPrevDetailsSection;
