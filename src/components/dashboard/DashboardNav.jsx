import React from "react";
import { useState } from "react";
import SideBarNav from "./SideBarNav";
import Header from "./Header";

const DashboardNav = () => {
  const [isOpen, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <>
     <Header openMenu={openMenu}/>
      <SideBarNav isOpen={isOpen} />
    </>
  );
};

export default DashboardNav;
