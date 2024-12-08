import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [reference, setReference] = useState("");

  const navigate = useNavigate();

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
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      // Check if the product already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex >= 0) {
        // If the item already exists, update the quantity safely
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity, // Increment based on passed quantity
        };
        return updatedItems; // Return the updated cart
      } else {
        // If it doesn't exist, add the product with the passed quantity
        return [...prevItems, { ...product, quantity }];
      }
    });

    // Update the total quantity of items in the cart
    setQuantity((prevQuantity) => prevQuantity + quantity); // Correctly update by the passed quantity
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

  // Function to handle the checkout process
  const handleCheckOut = async (customerId) => {
    try {
      // Check if customer is logged in
      if (!customerId) {
        toast.error("Customer information is missing. Please log in again.");
        return;
      }

      // Create the order payload by mapping cart items into the required structure
      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        count: item.quantity,
      }));

      // Check if there is no item selected then do nothing
      if (orderItems.length < 1) {
        toast.error("Your cart is empty. Please add items to your cart.");
        return;
      }

      // Create the complete order data object
      const orderData = {
        customerId,
        orderItems,
      };

      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Send POST request to create an order
      const orderRes = await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Extract Paystack payment URL order from response
      const paystackUrl = orderRes.data.paystackResponse.data.authorization_url;
      setReference(orderRes.data.paystackResponse.data.reference);

      // Redirect customer to Paystack for payment
      window.location.href = paystackUrl;
    } catch (error) {
      // Expired token error
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login and try again.");
        navigate("/login");
        // Handle out of stock items
      } else if (error.status === 400) {
        toast.error(error.response?.data.message);
      } else {
        // Catch all to handle unexpected errors
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Effect to verify the order payment once the reference is set
  useEffect(() => {
    const verifyOrder = async () => {
      // If there's no reference, do nothing
      if (!reference) {
        return;
      } else {
        try {
          // Send POST request to verify the payment using the reference
          const accessToken = localStorage.getItem("accessToken");
          const verifyOrderRes = await api.post(
            "/order/verify",
            { reference },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } catch (error) {
          // Handle errors
          toast.error("An error occured while verifying your order");
        }
      }
    };

    verifyOrder();
  }, [reference]);

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
        handleCheckOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
