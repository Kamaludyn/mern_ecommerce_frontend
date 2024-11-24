import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { customer } = useContext(AppContext);

  return (
    <div className="p-6 bg-white">
      <div className="w-full flex flex-col gap-2 text-text-primary">
        <div className="flex gap-4">
          <p className="text-lg">
            <strong>Surname: </strong>{" "}
            <span className=" p-0.5 px-1 bg-zinc-200 border border-zinc-300 rounded-[4px]">
              {customer.surname}
            </span>
          </p>
          <p className="text-lg">
            <strong>Other Name: </strong>
            <span className=" p-0.5 px-1 bg-zinc-200 border border-zinc-300 rounded-[4px]">
              {customer.othername}
            </span>
          </p>
        </div>

        <p className="text-lg ">
          <strong>Email Address: </strong>
          <span className=" p-0.5 px-1 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {customer.email}
          </span>
        </p>

        <p className="text-lg ">
          <strong>Phone Number: </strong>
          <span className=" p-0.5 px-1 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {customer.phone}
          </span>
        </p>
        <p>
          <strong>Address:</strong>
          <span className=" p-0.5 px-1 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {"Null"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
