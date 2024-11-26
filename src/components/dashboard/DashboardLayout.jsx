import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNav />
      <div className="box-border bg-white h-full w-full text-xs md:text-base mx-auto md:pl-[5.5rem] px-6 mt-[63px]">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
