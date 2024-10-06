import React from "react";
import { useNavigate } from "react-router-dom";

const FeedContent = ({ image, title, date, altText, data }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    console.log("working!!!");
    console.log("Data being passed to MapsPage:", data);
    navigate("/map", {
      state: {
        title,
        imageUrl: image,
        date,
        altText,
        data,
        lat: data.lat,
        long: data.long,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <img
        src={image}
        alt={altText}
        className="h-96 w-full rounded-md object-cover shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90"
      />
      <div className="mt-4 text-center">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="mb-4 text-sm text-gray-500">{data.description}</p>
        <button
          onClick={handleLearnMore}
          className="rounded bg-darker-base-color px-4 py-2 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-80"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FeedContent;
