/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import DoneIcon from "@mui/icons-material/Done";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import image2 from "../assets/image2.jpg";
import user from "../assets/user image.jpg";
import Maths from "../assets/maths.jpg";
import Quizblock from "../Components/Quizblock";
import useGenericApi from "../Hooks/useGenericApi";
import withAuth from "../Components/withAuth";
import { css } from "@emotion/react";
import { InfinitySpin } from "react-loader-spinner";

const Profile = () => {
  const { response, error, loading, fetchData } = useGenericApi();
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    fetchData("user", "POST", { userId: userId });
    if (response) {
      setFormData({
        username: response.username,
        email: response.email,
        mobile: response.mobile,
      });
    } else {
      console.log(error);
    }
  }, [fetchData]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: formData.username,
      email: formData.email,
      mobile: formData.mobile,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://quiz-app-pj53.onrender.com/app/v1/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            ...values,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("User updated successfully:", data);
          localStorage.setItem("user",response.user)
        } else {
          console.log("Error updating user:", data.error || "Unknown error");
        }
      } catch (error) {
        console.log("Error updating user:", error.message || "Unknown error");
      }
    },
  });


  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ml-[16.66%] bg-[#282828]">
        <InfinitySpin color="#4fa94d" loading={loading} css={override} />
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#282828] h-[100%]">
      <div className="bg-[#282828] ml-[16.66%] flex flex-col h-[100%]">
        <div className="flex ml-4 mt-5 items-end">
          <img
            src={user}
            className="w-32 h-32 relative bottom-2 bg-center bg-contain rounded-full mb-4"
            alt="User Image"
          />
          <div className="flex flex-col ml-6 items-center ">
            <h1 className="text-3xl text-white text-center font-bold mb-1">
              {response?.username}
            </h1>
            <div className="rounded-xl bg-black p-4 flex flex-col items-center">
              <div className="rounded-lg bg-[#282828] p-4 flex flex-col">
                <div className="flex items-center">
                  <EmailIcon className="text-white" />
                  <h1 className="text-white text-lg ml-1">{response?.email}</h1>
                </div>
                <div className="flex items-center mt-2">
                  <CallIcon className="text-white text-sm" />
                  <h1 className="text-white text-lg ml-1">{response?.mobile}</h1>
                </div>
              </div>
              <div className="flex items-center mt-2">
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 items-start ml-4 relative left-[50%]">
          <h1 className="text-white font-bold text-center">Quiz Statistics</h1>
          <div className="flex mt-4 mb-4">
            <div className="rounded-2xl mr-4 text-white bg-black">
              <div className="flex flex-col w-44 p-4">
                <div className="px-6 py-2 rounded-3xl bg-[#282828]">
                  <DoneIcon className="text-white font-extrabold w-[4px]" />
                </div>
                <div>
                  <h1 className="text-sm mt-1">Quizzes completed</h1>
                </div>
                <span className="text-lg mt-2">{response?.totalExam}</span>
              </div>
            </div>
            <div className="rounded-2xl mr-4 text-white bg-black">
              <div className="flex flex-col w-44 p-4">
                <div className="px-6 py-2 rounded-3xl bg-[#282828]">
                  <LeaderboardIcon className="text-white font-extrabold w-[4px]" />
                </div>
                <div>
                  <h1 className="text-sm mt-1">Leader Rank</h1>
                </div>
                <span className="text-lg mt-2">{response?.DailyRank?response.DailyRank:NaN}</span>
              </div>
            </div>
            <div className="rounded-2xl mr-4 text-white bg-black">
              <div className="flex flex-col w-44 p-4">
                <div className="px-6 py-2 rounded-3xl bg-[#282828]">
                  <DoneIcon className="text-white font-extrabold w-[4px]" />
                </div>
                <div>
                  <h1 className="text-sm mt-1">Total Score</h1>
                </div>
                <span className="text-lg mt-2">{response?.totalScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form for updating profile */}
        <div className="flex flex-col mt-6 items-start ml-[16.66%] mb-6 relative left-[50%]">
          <form
            onSubmit={formik.handleSubmit}
            className="border border-gray-300 rounded-md p-4 w-96"
          >
            <h1 className="text-white font-bold text-xl mb-2">Update Profile</h1>
            <div className="mb-3">
              <label htmlFor="username" className="text-white">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md p-2 ml-2 w-full border"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md p-2 ml-2 w-full border"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="text-white">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md p-2 ml-2 w-full border"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500">{formik.errors.mobile}</div>
              )}
            </div>
            <button
              type="submit"
              className="rounded-full text-white font-bold bg-red-700 py-2 px-4 hover:text-white hover:scale-105 transition duration-150"
            >
              Update Profile
            </button>
          </form>
        </div>
        {/* End of Form */}

      </div>
      <div className="">
      <div className="flex flex-col mt-6 ml-48 relative left-8 -top-1">
      <h1 className="text-white font-bold text-xl mb-2">Recent Quiz</h1>
      {response?.lastExams.slice(-3).reverse().map((data) => (
        <div className="bg-black flex flex-col rounded-lg p-2 mb-2" key={data.sectionName}>
          <div className="flex items-center my-1 mx-2">
            <img
              src={image2}
              className="w-8 h-8 rounded-full"
              alt="Subject Image"
            />
            <h1 className="text-white text-sm ml-2">{data.sectionName}</h1>
            <h1 className="text-white text-sm ml-24">Score: {data.score}</h1>
          </div>
        </div>
      ))}
    </div>
    
      </div>
    </div>
  );
};

export default withAuth(Profile);
