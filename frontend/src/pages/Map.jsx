import React, { useEffect, useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import testimg1 from "../assets/test-images/test-1.jpg";
import LoggedNavbar from "../components/LoggedNavbar";

const MapsPage = () => {
  const [location, setLocation] = useState({
    title: "Central Park",
    imageUrl: testimg1,
    likes: 99,
    description: "This is central park",
    comments: [
      { user: "John", text: "cool place" },
      { user: "Jane", text: "nice" },
    ],
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAL1kzmsE0Hzl28qm5Trp1_s76quJnsHEY`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.785091, lng: -73.968285 },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: 40.785091, lng: -73.968285 },
        map: map,
        title: location.title,
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location.title]);

  return (
    <>
      <LoggedNavbar />
      <div className="bg-lighter-base-color flex h-screen pt-20">
        {/* Map */}
        <div id="map" className="h-full w-2/3"></div>

        {/* Side container */}
        <div className="bg-lighter-base-color h-full w-1/3 overflow-scroll overflow-y-auto p-6 shadow-lg">
          <h2 className="mb-4 text-2xl">{location.title}</h2>

          <img
            src={location.imageUrl}
            alt={location.title}
            className="mb-4 rounded-lg shadow-md"
          />

          <div className="mb-4 flex items-center gap-2 text-lg">
            <FaHeart className="text-blue-500" />
            <span className="font-semibold">Likes: {location.likes}</span>
          </div>

          <p className="mb-4 text-lg">{location.description}</p>

          <h3 className="mb-2 text-xl">
            <FaComment className="mr-2 inline-block" /> Comments
          </h3>
          <ul className="space-y-4">
            {location.comments.map((comment, index) => (
              <li key={index} className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MapsPage;
