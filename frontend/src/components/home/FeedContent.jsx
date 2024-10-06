import React from "react";
import { useNavigate } from "react-router-dom";

const FeedContent = ({ image, title, date, altText }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/map", {});
  };
  return (
    <div className="flex flex-col">
      <img
        src={image}
        alt={altText}
        className="h-96 w-full rounded-md object-cover shadow-lg"
      />
      <div className="mt-4 text-center">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="mb-4 text-sm text-gray-500">{date}</p>
        <button
          onClick={(e) => handleClick(e)}
          className="bg-darker-base-color rounded px-4 py-2 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FeedContent;
