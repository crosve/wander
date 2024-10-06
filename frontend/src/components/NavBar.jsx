import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react"; // Importing the Hamburger component

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-base-color bg-opacity-80 px-8 py-4 font-thin backdrop-blur">
      <Link to="/" className="text-2xl">
        Wander
      </Link>
      {/* Hamburger menu btn */}
      <div className="block lg:hidden">
        <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      </div>
      {/* Desktop menu */}
      <div className="hidden gap-6 text-lg text-white lg:flex">
        <Link to="/login">
          <button className="rounded-md bg-darker-base-color px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="rounded-md bg-darker-base-color px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80">
            Sign Up
          </button>
        </Link>
      </div>
      {/* Mobile hamburger menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-8 top-16 w-48 rounded-lg bg-base-color shadow-lg lg:hidden`}
      >
        <Link
          to="/login"
          className="block px-4 py-2 hover:bg-darker-base-color"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="block px-4 py-2 hover:bg-darker-base-color"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
