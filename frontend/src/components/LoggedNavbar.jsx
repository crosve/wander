import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-base-color fixed z-10 flex w-full items-center justify-between bg-opacity-80 px-8 py-4 font-thin backdrop-blur">
      <div className="text-2xl">Wander</div>
      <div className="flex gap-6 text-lg text-white">
        <Link>
          <button
            onClick={(e) => logout(e)}
            className="bg-darker-base-color rounded-md px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80"
          >
            Logout
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-darker-base-color rounded-md px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoggedNavbar;
