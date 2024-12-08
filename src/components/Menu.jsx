import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";

const Menu = ({ isOpen, closeMenu }) => {
  const [categories, setCategories] = useState([]);

  // Array to define the desired order of the categories in the menu
  const desiredOrder = [
    "Phones",
    "Computers & Accessories",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Gaming",
    "Beauty",
    "Sports & Outdoors",
    "Luggage",
    "Building",
    "Automotives",
  ];

  // useEffect to fetch the categories from the backend API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const fetchedCategories = await response.data.categories;

        // Sort categories based on desiredOrder
        const sortedCategories = fetchedCategories.sort((a, b) => {
          return desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name);
        });

        // Update the categories state with the sorted categories
        setCategories(sortedCategories);
      } catch (error) {
        console.error("An error occurred while fetching categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section
        className={`${
          isOpen ? "h-full" : "h-0"
        } fixed flex md:static top-[50px] left-0 md:h-full md:flex w-full text-bold text-text-primary md:text-white bg-white md:bg-secondary md:py-0 overflow-x-hidden transition-width duration-200 ease-in-out`}
      >
        <div className="bg-white md:bg-transparent w-full md:w-[82%] flex flex-col md:flex-row md:items-center gap-4 mb-[50px] md:mb-0 md:mx-auto overflow-auto md:overflow-hidden">
          <div className="flex flex-col md:items-center md:flex-row">
            <div className="order-2 md:order-1 flex mr-3 hover:text-accent cursor-pointer group">
              <span className="whitespace-nowrap hidden md:inline p-0 md:py-2.5 mr-1">
                All Categories
              </span>
              <span className="whitespace-nowrap p-4 pl-5 md:hidden">
                Our Categories
              </span>
              <FaBars className="hidden md:inline self-center mt-1.5" />

              {/* Dropdown for categories on hover */}
              <div
                id="dropDownCategories"
                className="fixed top-[113px] left-[8%] w-[250px] max-h-[80vh] p-4 bg-white text-text-primary shadow-uShape hidden md:group-hover:block overflow-y-auto"
              >
                <ul className="flex flex-col gap-2 z-50 divide-y-2 ">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="hover:text-accent py-1 pl-1"
                    >
                      <NavLink
                        to={`/category/${category._id}?name=${category.name}`}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          isActive ? "text-accent" : ""
                        }
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Dropdown categorires End */}
            </div>
          </div>
          {/* Main categories menu */}
          <div className="flex flex-col md:flex-row justify-between flex-grow md:gap-10 my-0 w-full divide-y">
            <ul className="flex flex-col md:flex-row justify-between md:gap-9 my-0 divide-y whitespace-nowrap">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="hover:text-accent p-4 pl-5 md:p-0 md:border-none cursor-pointer"
                >
                  <NavLink
                    to={`/category/${category._id}?name=${category.name}`}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-accent md:border-b-4 border-accent md:py-2 md:px-0"
                        : ""
                    }
                  >
                    {category.name === "Phones"
                      ? "Phones & Accesories"
                      : category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Main categories end */}
        </div>
      </section>
    </>
  );
};

export default Menu;
