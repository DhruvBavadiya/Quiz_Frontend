// Import necessary libraries and components
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGenericApi from "../Hooks/useGenericApi";
import Cookies from 'js-cookie';

const Login = () => {
  const { response, loading, error, fetchData } = useGenericApi();
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
      localStorage.setItem("user", userString);
      Cookies.set("auth-token", response.token, { expires: 7 });
      toast.success("Login successful!");
      navigate("/");
    }
  }, [response, error, navigate]);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
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
