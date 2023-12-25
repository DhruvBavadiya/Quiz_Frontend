// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';

// Function to get the authentication token from cookies
const getAuthTokenFromCookie = () => {
  return Cookies.get('auth-token'); // Replace 'yourAuthTokenCookieName' with the actual name of your authentication token cookie
};

// Sidebar component
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the presence of an authentication token in cookies
  useEffect(() => {
    const authToken = getAuthTokenFromCookie();

    // Update isLoggedIn based on the presence of the token
    setIsLoggedIn(!!authToken);
  }, []);

  // Function to check if the current route is login or signup
  const isAuthRoute = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  // Common style for icons
  const iconStyle = 'text-lg mr-2';

  // Return the JSX for the Sidebar component
  return (
    <div className="h-screen w-1/6 bg-[#121212] p-4 justify-between flex flex-col text-white fixed">
      <div>
        <h1 className="text-3xl font-bold mt-5 mb-4">
          <Link to="/">
            Quizzy
          </Link>
        </h1>
        <ul className="flex flex-col space-y-3">
          <li className="hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <HomeIcon className={iconStyle} />
              Home
            </Link>
          </li>
          <li className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/quiz" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <QuizIcon className={iconStyle} />
              Quizzes
            </Link>
          </li>
          <li className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/leaderboard" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <LeaderboardIcon className={iconStyle} />
              Leaderboard
            </Link>
          </li>
          <li className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/about" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <InfoIcon className={iconStyle} />
              About
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
      <div className=''>
        <button
          onClick={isAuthRoute}
          type="button"
          className="text-white bg-[#040D12] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#040D12] dark:hover:bg-gray-950 focus:outline-none hover:scale-105"
        >
          <AccountCircleIcon className='text-white scale-105 me-2' />
          {isLoggedIn ? 'Your Profile' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
