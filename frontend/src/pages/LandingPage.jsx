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
        <div className="relative flex h-screen flex-col items-center justify-center bg-lighter-base-color px-4 text-black">
          <div className="absolute left-0 top-24 flex w-full flex-col items-center">
            <h1 className="text-4xl font-bold text-text-color sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Explore Wander
            </h1>
            <h2 className="mt-4 text-2xl text-text-color sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Discover new experiences
            </h2>
          </div>
          <div className="relative mt-48 h-[400px] w-[90%] max-w-[700px] sm:h-[300px] sm:max-w-[95%] md:h-[500px] md:max-w-[80%] lg:max-w-[70%]">
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
          <p className="mt-4 text-base text-white sm:text-sm md:text-base lg:text-lg">
            Click on the card to see the next image
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col items-center bg-lighter-base-color px-4 py-16 md:flex-row">
          <img
            src={testimg1}
            className="mb-8 h-auto w-full max-w-[90%] rounded-md sm:max-w-[80%] md:mb-0 md:mr-8 md:w-[45%]"
          />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-3xl">
              About Wander
            </h3>
            <p className="mt-4 text-base sm:text-sm md:text-base lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              ratione, hic esse quas nostrum temporibus?
            </p>
            <button className="mt-6 rounded-md bg-darker-base-color px-6 py-3 text-lg text-white sm:text-sm md:text-base lg:text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-center bg-lighter-base-color px-4 py-16 md:flex-row-reverse">
          <img
            src={testimg1}
            className="mb-8 h-auto w-full max-w-[90%] rounded-md sm:max-w-[80%] md:mb-0 md:ml-8 md:w-[45%]"
          />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-3xl">
              Discover Hidden Gems
            </h3>
            <p className="mt-4 text-base sm:text-sm md:text-base lg:text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              inventore eum voluptatum repellat eligendi dignissimos?
            </p>
            <button className="mt-6 rounded-md bg-darker-base-color px-6 py-3 text-lg text-white sm:text-sm md:text-base lg:text-lg">
              View Gallery
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-color py-8 text-center text-white">
          <h4 className="text-xl font-bold sm:text-lg md:text-xl lg:text-2xl">
            Sign up today
          </h4>
          <button className="mt-4 rounded-md bg-darker-base-color px-6 py-3 text-lg text-white sm:text-sm md:text-base lg:text-lg">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
