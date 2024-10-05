import React from "react";

const NavBar = () => {
  return (
    <div className="bg-base-color fixed flex w-full items-center justify-between px-8 py-4 font-thin">
      <div className="text-2xl">Wander</div>
      <div className="flex gap-6 text-lg text-white">
        <button className="bg-darker-base-color rounded-md px-6 py-2 shadow-md transition-all duration-300 hover:scale-105">
          Login
        </button>
        <button className="bg-darker-base-color rounded-md px-6 py-2 shadow-md transition-all duration-300 hover:scale-105">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
