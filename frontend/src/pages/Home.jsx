import React, { useState } from "react";
import FeedContent from "../components/home/FeedContent";
import testimg1 from "../assets/test-images/test-1.jpg";
import testimg2 from "../assets/test-images/test-2.jpg";
import testimg3 from "../assets/test-images/test-3.jpg";
import testimg4 from "../assets/test-images/test-4.jpg";
import LoggedNavbar from "../components/LoggedNavbar";
import NewLocationForm from "../components/home/NewLocationForm";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <LoggedNavbar />
      <div className="bg-lighter-base-color min-h-screen">
        <div className="mx-auto max-w-screen-lg pt-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FeedContent image={testimg1} title="title1" date="1/1/24" />
            <FeedContent image={testimg2} title="title2" date="1/1/24" />
            <FeedContent image={testimg3} title="title3" date="1/1/24" />
            <FeedContent image={testimg4} title="title4" date="1/1/24" />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={handleFormOpen}
            className="fixed bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-gray-600 text-white shadow-md transition-all hover:bg-gray-500"
          >
            +
          </button>
        </div>

        {isFormOpen && <NewLocationForm onClose={handleFormClose} />}
      </div>
    </>
  );
};

export default Home;
