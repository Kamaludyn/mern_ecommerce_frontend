import React from "react";
import { useState } from "react";
import SideBarNav from "./SideBarNav";
import Header from "./Header";

const DashboardNav = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <SideBarNav isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default DashboardNav;
