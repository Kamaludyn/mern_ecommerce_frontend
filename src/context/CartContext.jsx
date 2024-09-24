import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Function to increment the count
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Function to decrement the count, ensuring it doesn't go below 0
  const decrementCount = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      }
      return 0;
    });
  };

  // Function to add a product to the cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if the product already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex >= 0) {
        // If the item already exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // If it doesn't exist, add the product with the specified quantity
        return [...prevItems, { ...product, quantity }];
      }
    });

    // Update the total quantity of items in the cart
    setQuantity((prevQuantity) => prevQuantity + quantity);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      // Filter out the item with the given productId
      const updatedItems = prevItems.filter((item) => item._id !== productId);
      // Update the total quantity based on the new cart items
      setQuantity(
        updatedItems.reduce((total, item) => total + item.quantity, 0)
      );

      // Return the updated cart items
      return updatedItems;
    });
  };
  return (
    <CartContext.Provider
      value={{
        count,
        setCount,
        quantity,
        setQuantity,
        incrementCount,
        decrementCount,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
