import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import avatar from "../assets/test-images/avatar.webp";

function LoggedNavbar() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (token) {
      localStorage.removeItem("jwtToken");
    }

    navigate("/");
  };
  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-base-color bg-opacity-80 px-8 py-4 font-thin backdrop-blur">
      <Link to="/feed" className="text-2xl">
        Traktty
      </Link>
      <div className="flex gap-6 text-lg text-white">
        <Link>
          <button
            onClick={(e) => logout(e)}
            className="rounded-md bg-darker-base-color px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80"
          >
            Logout
          </button>
        </Link>
        <Link to="/profile">
          <button className="rounded-md bg-darker-base-color px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoggedNavbar;
