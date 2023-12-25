// Signup.jsx

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGenericApi from "../Hooks/useGenericApi";
import Cookies from 'js-cookie';

const Signup = () => {
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
      const userString = JSON.stringify(response?.user);
      localStorage.setItem("user", userString);
      localStorage.setItem("token", response.token);
      toast.success("Signup successful!");
      navigate("/");
    }
    if (error) {
      console.error("Error in Signup:", error);
      toast.error("Signup failed. Please try again.");
    }
  }, [response, error, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    mobile: Yup.number()
      .typeError("Mobile must be a number")
      .positive("Mobile must be positive")
      .integer("Mobile must be an integer"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      mobile: null,
    },
    validationSchema,
    onSubmit: (values) => {
      fetchData("signup", "POST", values);
    },
  });

  return (
    <div className="flex items-center justify-center ml-[16.66%] min-h-screen bg-[#282828]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form
        onSubmit={formik.handleSubmit}
        className="w-96 p-8 bg-white shadow-md rounded"
      >
        <h1 className="text-3xl font-semibold mb-8 text-[#282828]">
          Join Quizzy now!
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile:
            </label>
            <input
              type="text"
              name="mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 p-2 w-full bg-gray-950 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div className="mt-4">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="ml-2 text-gray-950 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
