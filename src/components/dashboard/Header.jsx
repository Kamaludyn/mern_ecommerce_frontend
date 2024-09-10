import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/mernMart-name-logo.png";

const Header = ({ openMenu }) => {
  return (
    <header className="bg-teal-200 w-full md:text-xl fixed top-0 left-0 flex justify-between items-center py-3 pl-5 pr-6 z-40 overflow-hidden">
      <div className="flex gap-6 items-center">
        <div
          className="hover:cursor rounded-full hover:bg-teal-300 p-2 cursor-pointer"
          onClick={openMenu}
        >
          <FaBars />
        </div>
        <Link to="/" className="w-36 cursor-pointer ">
          <img src={logo} alt="MertMart-Brand-Logo" />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-3">
        <FaBell />
        <FaUserCircle />
      </div>
    </header>
  );
};

export default Header;
