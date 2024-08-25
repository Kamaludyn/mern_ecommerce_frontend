import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="bg-bg h-full w-full text-xs md:text-base overflow-x-hidden pt-[130px] ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
