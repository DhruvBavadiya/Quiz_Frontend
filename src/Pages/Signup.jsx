// Signup.jsx

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    mobile: Yup.number().typeError("Mobile must be a number").positive("Mobile must be positive").integer("Mobile must be an integer"),
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
      console.log("Signup Form Data:", values);
      // Simulating successful form submission
      toast.success("Signup successful!");
      // Navigate to the home page
      navigate("/");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#282828]">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <form onSubmit={formik.handleSubmit} className="w-96 p-8 bg-white shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-[#282828]">
          Join Quizzy now!
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile:</label>
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

        <button type="submit" className="mt-6 p-2 w-full bg-blue-500 text-white rounded-md">
          Sign up
        </button>

        {/* "Already have an account?" link */}
        <div className="mt-4">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="ml-2 text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
