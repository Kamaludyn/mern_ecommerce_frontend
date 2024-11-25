import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/mernMart-name-logo.png";

const Header = ({ toggleMenu }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-teal-200 w-full md:text-xl fixed top-0 left-0 flex justify-between items-center py-3 pl-5 pr-6 z-40 overflow-hidden">
        <div className="flex gap-6 items-center">
          <div
            className="hover:cursor rounded-full hover:bg-teal-300 p-2 cursor-pointer"
            onClick={toggleMenu}
          >
            <FaBars />
          </div>
          <Link to="/" className="w-36 cursor-pointer ">
            <img src={logo} alt="MertMart-Brand-Logo" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:text-3xl text-text-primary">
          <FaUserCircle
            className="hover:text-text-secondary cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
