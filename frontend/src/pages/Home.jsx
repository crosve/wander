import React from "react";
import FeedContent from "../components/home/FeedContent";
import testimg1 from "../assets/test-images/test-1.jpg";
import testimg2 from "../assets/test-images/test-2.jpg";
import testimg3 from "../assets/test-images/test-3.jpg";
import testimg4 from "../assets/test-images/test-4.jpg";
import LoggedNavbar from "../components/LoggedNavbar";
import NavBar from "../components/NavBar";

const Home = () => {
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
      </div>
    </>
  );
};

export default Home;
