import logo from "../../assets/images/logo/mernMart-name-logo.png";
import {
  FaQuestionCircle,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Twirl as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Menu from "../../components/Menu";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateUser = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, navigate to the profile page
      navigate("/profile");
    } else {
      // If no token, navigate to the login page
      navigate("/login");
    }
  };

  // Function to close menu on small screen
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="bg-white w-full fixed top-0 z-50 overflow-x-hidden">
        <nav className=" w-[90%] md:w-[80%] relative text-xs md:text-base flex items-center justify-between pb-14 md:pb-0 md:mb-[5px] mx-auto">
          <div className="flex items-center w-1/2 md:w-[25%] p-0">
            <div className="md:hidden -ml-5">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                size={23}
                distance="sm"
                rounded
                color="#333333"
              />
            </div>
            <Link to="/">
              <img
                src={logo}
                alt="MertMart-Brand-Logo"
                className="w-40 md:w-96 h-11 md:h-16 cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex items-center w-11/12 md:w-[50%] absolute top-[55%] right-[4%] bg-white p-0 md:static rounded-3xl text-center shadow-[0_0_5px_4px_rgba(0,0,0,0.06)]">
            <FaSearch className="m-3 mr-2 text-text-primary" />
            <input
              type="search"
              name="search"
              id="search"
              className="w-3/4 p-1 outline-none bg-transparent
              "
              placeholder="Search for products, brands and categories"
            />
            <button className="bg-accent hover:bg-amber-600 h-full py-3 px-3 flex-grow text-white text-center self-center rounded-3xl rounded-l-sm shadow-[0_0_5px_4px_rgba(0,0,0,0.05)]">
              Search
            </button>
          </div>
          <div className="flex gap-2 justify-between md:w-[15%]">
            <FaUser
              onClick={navigateUser}
              className="text-2xl text-text-primary hover:text-accent transition-colors duration-100 ease-in-out cursor-pointer"
            />

            <div className="flex">
              <FaQuestionCircle className="text-2xl text-text-primary hover:text-accent transition-colors duration-100 ease-in-out cursor-pointer" />
            </div>
            <div className="flex">
              <FaShoppingCart className="text-2xl text-text-primary hover:text-accent transition-colors duration-100 ease-in-out cursor-pointer" />
            </div>
          </div>
        </nav>
        <Menu isOpen={isOpen} closeMenu={closeMenu} />
      </header>
    </>
  );
};

export default NavBar;
