import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <ul className="flex flex-col gap-5 mt-10 p-8 pt-3 rounded-xl border shadow-uShape">
        <h1 className="text-center font-semibold text-lg mb-2 border-b-2">
          Personal Info
        </h1>
        <li>
          <strong>Name:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.othername} {user.surname}
          </span>
        </li>
        <li>
          <strong>Phone:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.phone}
          </span>
        </li>
        <li>
          <strong>Email:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.email}
          </span>
        </li>
        <li>
          <strong>Street:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.address.street}
          </span>
        </li>
        <li>
          <strong>Town:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.address.town}
          </span>
        </li>
        <li>
          <strong>Country:</strong>
          <span className=" p-0.5 px-1 ml-2 bg-zinc-200 border border-zinc-300 rounded-[4px]">
            {user.address.country}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default UserProfile;
