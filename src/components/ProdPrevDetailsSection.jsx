import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProdPrevDetailsSection = ({ product }) => {
  const {
    count,
    setCount,
    setQuantity,
    setCartItems,
    incrementCount,
    decrementCount,
  } = useCart();

  // Function to add product to the cart according to the input value
  const addCountToCart = () => {
    if (count > 0) {
      setCartItems((prevItems) => {
        // Check if the product already exists in the cart by comparing the product IDs
        const existingItemIndex = prevItems.findIndex(
          (item) => item._id === product._id
        );

        if (existingItemIndex >= 0) {
          // If the product already exists, create a copy of the cart items
          const updatedItems = [...prevItems];

          // Update the quantity of the existing product by adding the current count
          updatedItems[existingItemIndex].quantity += count;

          // Return the updated cart items array
          return updatedItems;
        } else {
          // If the product doesn't exist in the cart, add it as a new item
          // Set its quantity to the current count value
          return [...prevItems, { ...product, quantity: count }];
        }
      });

      // Update the total quantity of items in the cart by adding the current count
      setQuantity((prevQuantity) => prevQuantity + count);
    }
  };

  return (
    <section className="flex flex-col justify-center md:h-full text-text-primary mx-5 gap-5 mt-2 lg:mt-0 lg:w-[35%]">
      <h2 className="text-xl font-semibold ">{product.name}</h2>
      <p className="">{product.description}</p>

      <p className="">
        <strong> ${product.price}</strong>
      </p>

      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-between items-center p-2 border-[2px] rounded-lg">
          <FaMinus
            className="text-xl hover:text-accent cursor-pointer"
            onClick={decrementCount}
          />
          <input
            className="w-[70%] bg-bg text-center font-semibold outline-none border-none"
            type="text"
            inputMode="numeric"
            value={count}
            onChange={() => setCount(prevCount)}
          />
          <FaPlus
            className="text-xl hover:text-accent cursor-pointer"
            onClick={incrementCount}
          />
        </div>

        <button
          className="bg-accent rounded-lg w-full text-center text-white font-semibold p-3 hover:bg-amber-600"
          id="add-btn"
          onClick={() => addCountToCart(product)}
        >
          Add to cart
          <FaShoppingCart className="inline ml-2" />
        </button>
      </div>
    </section>
  );
};

export default ProdPrevDetailsSection;
