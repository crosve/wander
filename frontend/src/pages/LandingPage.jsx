import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import testimg1 from "../assets/test-images/test-1.jpg";
import testimg2 from "../assets/test-images/test-2.jpg";
import testimg3 from "../assets/test-images/test-3.jpg";
import testimg4 from "../assets/test-images/test-4.jpg";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const images = [testimg1, testimg2, testimg3, testimg4];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/feed");
    }
  }, []);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <NavBar />
      <div>
        {/* Hero */}
        <div className="bg-lighter-base-color relative flex h-screen flex-col items-center justify-center text-black">
          <div className="absolute left-0 top-24 flex w-full flex-col items-center">
            <h1 className="text-text-color text-6xl font-bold">
              Explore Wander
            </h1>
            <h2 className="text-text-color mt-4 text-4xl">
              Discover new experiences
            </h2>
          </div>
          <div className="relative mt-48 h-[600px] w-[800px]">
            {images.map((image, index) => {
              const isActive = index === currentIndex;
              const isNext = index === (currentIndex + 1) % images.length;
              const zIndex = images.length - index;

              return (
                <motion.div
                  key={index}
                  className="absolute h-full w-full"
                  style={{
                    zIndex: zIndex,
                    transformOrigin: "center",
                  }}
                  initial={{
                    rotate: -5 * (index - currentIndex),
                    y: 5 * (index - currentIndex),
                    opacity: isActive || isNext ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                  }}
                  animate={{
                    rotate: isActive ? 0 : -5 * (index - currentIndex),
                    y: isActive ? 0 : 5 * (index - currentIndex),
                    opacity: isActive || isNext ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full cursor-pointer rounded-md object-cover shadow-md"
                    onClick={handleNextImage}
                  />
                </motion.div>
              );
            })}
          </div>
          <p className="mt-4 text-white">
            Click on the card to see the next image
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col items-center bg-gray-100 py-16 md:flex-row">
          <img src={testimg1} className="h-auto w-full md:w-1/2" />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-3xl font-bold">About Wander</h3>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              ratione, hic esse quas nostrum temporibus?
            </p>
            <button className="bg-darker-base-color mt-6 rounded-md px-6 py-3 text-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-center bg-gray-100 py-16 md:flex-row-reverse">
          <img src={testimg1} className="h-auto w-full md:w-1/2" />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-3xl font-bold">Discover Hidden Gems</h3>
            <p className="mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              inventore eum voluptatum repellat eligendi dignissimos?
            </p>
            <button className="bg-darker-base-color mt-6 rounded-md px-6 py-3 text-white">
              View Gallery
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-color py-8 text-center text-white">
          <h4 className="text-2xl font-bold">Sign up today</h4>
          <button className="bg-darker-base-color mt-4 rounded-md px-6 py-3 text-white">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
