/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// Import necessary libraries and components
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGenericApi from "../Hooks/useGenericApi";
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { response, loading, error, fetchData } = useGenericApi();
  const { isLoggedIn, login, logout } = useAuth();

  const navigate = useNavigate();

  // Check if the user is already logged in (has a valid token)
  useEffect(() => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      toast.warning("You are already logged in.");
      navigate("/");
    }

    // Cleanup function
    return () => {
      // Any cleanup logic, if needed
    };
  }, [navigate]);

  // Handle the API response
  useEffect(() => {
    if (response) {
      console.log(response);
  
      // Store token in localStorage
      const userString = JSON.stringify(response?.user);
      login()
      localStorage.setItem("user", userString);
      Cookies.set("auth-token", response.token, { expires: 7 });
      toast.success("Login successful!");
      navigate("/");
    }
    if (error) {
      console.error("Error in Login:", error);

      // Check if there is a response from the API with an error code
      if (error.response && error.response.data && error.response.data.errorCode) {
        toast.error(error.response.data.message); // Display the error message from the API
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  }, [response, error, navigate]);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetchData("login", "POST", values);
      
    },
  });

  // JSX for the Login component
  return (
    <div className="flex items-center justify-center ml-[16.66%] min-h-screen bg-[#282828]">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <form onSubmit={formik.handleSubmit} className="w-96 p-8 bg-white shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-[#282828]">
          Welcome back to Quizzy!
        </h1>

        <div className="space-y-4">
          <div>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 p-2 w-full bg-gray-950 text-white rounded-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* "Don't have an account?" link */}
        <div className="mt-4">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/signup" className="ml-2 text-gray-950 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
