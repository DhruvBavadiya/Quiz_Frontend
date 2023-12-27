// Import necessary libraries and components
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Added logout icon
import { useAuth } from '../Context/AuthContext';
import Cookies from 'js-cookie';

// Function to get the authentication token from cookies
const getAuthTokenFromCookie = () => {
  return Cookies.get('auth-token');
};

// Sidebar component
const Sidebar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  // Check for the presence of an authentication token in cookies
  useEffect(() => {
    const authToken = getAuthTokenFromCookie();

    // Update isLoggedIn based on the presence of the token
    if (authToken) {
      login(); // Use the login function to update the login status
    }
  }, [login]);

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch('https://quiz-app-pj53.onrender.com/app/v1/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Clear cookies
        Cookies.remove('auth-token');

        // Clear localStorage
        localStorage.removeItem('user');

        // Update login status
        logout();

        // Redirect to home
        navigate('/');
      } else {
        // Handle logout error
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error during logout:', error.message);
    }
  };

  // Function to check if the current route is login or signup
  const isAuthRoute = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  const handleLogin = () => {
    // Add your login logic here
    // On successful login, update the login status
    // Redirect to the desired page (e.g., profile)
    navigate('/login');

  };

  // Common style for icons
  const iconStyle = 'text-lg mr-2';

  // Return the JSX for the Sidebar component
  return (
    <div className="h-screen w-1/6 bg-[#121212] p-4 justify-between flex flex-col text-white fixed">
      <div>
        <h1 className="text-3xl font-bold mt-5 mb-4">
          <Link to="/" className="w-full">
            Quizzy
          </Link>
        </h1>
        <ul className="flex flex-col space-y-3">
          <Link to="/" className="hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/" className="text-lg py-4 px-2 w-full hover:text-white transition duration-300">
              <HomeIcon className={iconStyle} />
              Home
            </Link>
          </Link>
          <Link to="/quiz" className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/quiz" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <QuizIcon className={iconStyle} />
              Quizzes
            </Link>
          </Link>
          <Link to="/leaderboard" className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/leaderboard" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <LeaderboardIcon className={iconStyle} />
              Leaderboard
            </Link>
          </Link>
          <Link to="/about" className="mb-2 hover:bg-blue-700 rounded transition duration-300 hover:scale-105">
            <Link to="/about" className="text-lg py-4 px-2 hover:text-white transition duration-300">
              <InfoIcon className={iconStyle} />
              About
            </Link>
          </Link>
          {/* Add more links as needed */}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        {isLoggedIn ? (
          <>
            <button
              onClick={isAuthRoute}
              type="button"
              className="text-white flex  items-center bg-[#040D12] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#040D12] dark:hover:bg-gray-950 focus:outline-none hover:scale-105"
            >
              <AccountCircleIcon className="text-white scale-105 me-2" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-[#040D12] hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#040D12] dark:hover:bg-red-800 focus:outline-none hover:scale-105 ml-2"
            >
              <ExitToAppIcon className="text-white scale-105 me-2" />
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            type="button"
            className="text-white bg-[#040D12] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#040D12] dark:hover:bg-gray-950 focus:outline-none hover:scale-105"
          >
            <AccountCircleIcon className="text-white scale-105 me-2" />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
