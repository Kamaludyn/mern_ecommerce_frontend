import { FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cartItems, removeFromCart, handleCheckOut } = useCart();

  const { openCart, customer, closeCart } = useContext(AppContext);

  const customerId = customer?.id;

  // Ref to the cart container for detecting outside clicks
  const cartRef = useRef(null);

  // Effect to handle closing the cart when clicking outside the cart container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    // Add event listener when cart is open
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openCart]);

  return (
    <section
      id="cart-section"
      className="fixed top-12 md:top-16 right-5 bg-bg w-4/5 md:w-2/6 md:min-w-[33.333%] p-4 rounded-lg drop-shadow-lg shadow-uShape z-[60] max-h-[88vh] overflow-y-auto"
      ref={cartRef}
    >
      <h1 className="font-semibold p-1.5 pt-0 border-b-2">Cart</h1>

      <div className="flex flex-col items-center gap-3 my-3 text-sm md:text-base">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="w-full flex items-center justify-between gap-1 text-text-primary pb-2 border-b border-gray-300 "
            >
              <img
                className="h-12 w-12 rounded-md"
                src={item.image.secure_url}
                alt=""
              />
              <p className="flex flex-col items-center text-center">
                {item.name}
                <span>
                  ${item.price} x {item.quantity}Pcs =
                  <strong> ${(item.price * item.quantity).toFixed(2)}</strong>
                </span>
              </p>
              <FaTrash
                className="text-base min-w-4 text-rose-500 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(), removeFromCart(item._id);
                }}
              />
            </div>
          ))
        ) : (
          <p className="my-5">Your Cart is empty</p>
        )}
        <button
          className="bg-accent hover:opacity-80 text-white w-full font-semibold p-2 rounded-lg"
          onClick={() => handleCheckOut(customerId)}
        >
          Check Out
        </button>
      </div>
    </section>
  );
};

export default Cart;
