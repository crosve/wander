import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FeedContent from "../components/home/FeedContent";
import testimg1 from "../assets/test-images/test-1.jpg";
import testimg2 from "../assets/test-images/test-2.jpg";
import testimg3 from "../assets/test-images/test-3.jpg";
import testimg4 from "../assets/test-images/test-4.jpg";
import LoggedNavbar from "../components/LoggedNavbar";
import NewLocationForm from "../components/home/NewLocationForm";
import axios from "axios";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        const data = response.data;
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <LoggedNavbar />
      <div className="min-h-screen bg-lighter-base-color">
        <div className="mx-auto max-w-screen-lg pt-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <FeedContent
                  key={index}
                  image={`https://gateway.pinata.cloud/ipfs/${post.CIDs[0]}`} // Construct the full URL
                  title={post.title}
                  date="1/1/24" // You can format the date as needed
                  data={post}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
            {/* Sample FeedContent components with test images */}
            <FeedContent
              image={testimg1}
              title="Sample Title 1"
              date="1/1/24"
              data={{}}
            />
            <FeedContent
              image={testimg2}
              title="Sample Title 2"
              date="1/1/24"
              data={{}}
            />
            <FeedContent
              image={testimg3}
              title="Sample Title 3"
              date="1/1/24"
              data={{}}
            />
            <FeedContent
              image={testimg4}
              title="Sample Title 4"
              date="1/1/24"
              data={{}}
            />
          </div>
        </div>
        <div className="relative">
          <motion.div
            className="fixed bottom-10 right-10 flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered && (
              <motion.span
                className="mr-4 text-lg font-thin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                Add New Location
              </motion.span>
            )}
            <button
              onClick={handleFormOpen}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-darker-base-color text-2xl text-white shadow-md transition-all hover:scale-105 hover:opacity-80"
            >
              +
            </button>
          </motion.div>
        </div>

        {isFormOpen && <NewLocationForm onClose={handleFormClose} />}
      </div>
    </>
  );
};

export default Home;
