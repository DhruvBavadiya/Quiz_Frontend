import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Function to get authentication token from cookie
const getAuthTokenFromCookie = () => {
  return Cookies.get('auth-token'); // Replace 'yourAuthTokenCookieName' with the actual name of your authentication token cookie
};

// HOC to check for authentication token and redirect to login if not present
const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const authToken = getAuthTokenFromCookie();

      if (!authToken) {
        navigate('/login'); // Change '/login' to your login route
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

// Example of using the withAuth HOC
// Import and use it in the component where you want to enforce authentication
// For example, you can wrap your ExamPage component with withAuth like this:

// import withAuth from 'path-to/withAuth';

// const AuthenticatedExamPage = withAuth(ExamPage);

// Then use AuthenticatedExamPage in your component tree
