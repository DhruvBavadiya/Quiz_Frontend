import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-[70%] items-center space-y-4">
        <div className="flex-col space-y-4 text-center md:w-1/2 w-[80%]">
          <div className="text-fuchsia-600 text-xl font-medium">Tailblocks</div>
          <div className="text-5xl font-medium">Page not found</div>
          <div className="text-gray-500">Sorry, the page you're looking for isn't available.</div>
          <div className="flex items-center justify-center">
            <Link to="/" className="bg-fuchsia-600 px-4 py-1 text-white font-medium rounded-lg hover:scale-105 cursor-pointer">Visit Homepage</Link>
          </div>
        </div>
        <div className="md:w-96 w-[70%] md:h-96 h-48 bg-gray-200 rounded-xl overflow-hidden">
          <img src="https://source.unsplash.com/800x1200/?robot,error" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
