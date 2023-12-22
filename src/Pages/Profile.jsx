/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import Maths from "../assets/maths.jpg";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import DoneIcon from "@mui/icons-material/Done";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import image2 from "../assets/image2.jpg"
import user from "../assets/user image.jpg"
import Quizblock from "../Components/Quizblock";
import useGenericApi from "../Hooks/useGenericApi";

const Profile = () => {

  const {response ,error ,loading,fetchData} =useGenericApi()

  const trending = [
    { name: "Physics", description: "Dive into Knowledge of physics." },
    { name: "Gk", description: "Get test yourself with general Knowledge." },
    { name: "Maths", description: "Let's test maths with your logic." },
    { name: "Maths", description: "Let's test maths with your logic." },
  ];

  const token = localStorage.getItem('token')
  console.log(token)
  useEffect(() => {
    fetchData('user', 'GET',{'token':token});
    if (response) {
      console.log(response);
    } else {
      console.log(error);
    }
  }, [fetchData]);
  

  return (
    <div className="flex bg-[#282828] h-[100vh]">
      <div className="bg-[#282828] ml-[16.66%] flex flex-col h-[100%]">
        <div className="flex ml-4 mt-5 items-end">
          <img
            src={user}
            className="w-32 h-32 relative bottom-2 bg-center bg-contain rounded-full mb-4"
            alt="User Image"
          />
          <div className="flex flex-col ml-6 items-center ">
            <h1 className="text-3xl text-white text-center font-bold mb-1">
              User name
            </h1>
            <div className="rounded-xl bg-black p-4 flex flex-col items-center">
              <div className="rounded-lg bg-[#282828] p-4 flex flex-col">
                <div className="flex items-center">
                  <EmailIcon className="text-white" />
                  <h1 className="text-white text-lg ml-1">user1@gmail.com</h1>
                </div>
                <div className="flex items-center mt-2">
                  <CallIcon className="text-white text-sm" />
                  <h1 className="text-white text-lg ml-1">8238978978</h1>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <button className="rounded-full text-white font-bold bg-red-700 py-2 px-4 hover:text-white hover:scale-105 transition duration-150">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 items-start ml-4 relative left-[50%]">
          <h1 className="text-white font-bold text-center">Quiz Statastic</h1>
          <div className="flex mt-4 mb-4">
            <div className="rounded-2xl mr-4 text-white bg-black">
              <div className="flex flex-col w-44 p-4">
                <div className="px-6 py-2 rounded-3xl bg-[#282828]">
                  <DoneIcon className="text-white font-extrabold w-[4px]" />
                </div>
                <div>
                  <h1 className="text-sm mt-1">Quizzes completed</h1>
                </div>
                <span className="text-lg mt-2">9</span>
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
                <span className="text-lg mt-2">9</span>
              </div>
            </div>
            <div className="rounded-2xl mr-4 text-white bg-black">
              <div className="flex flex-col w-44 p-4">
                <div className="px-6 py-2 rounded-3xl bg-[#282828]">
                  <DoneIcon className="text-white font-extrabold w-[4px]" />
                </div>
                <div>
                  <h1 className="text-sm mt-1">Quizzes completed</h1>
                </div>
                <span className="text-lg mt-2">9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col mt-6 ml-48 relative left-8 -top-1">
          <h1 className="text-white font-bold text-xl mb-2">Recent Quiz</h1>
          <div className="bg-black flex flex-col rounded-lg p-2 mb-2">
            <div className="flex items-center my-1 mx-2">
              <img
                src={image2}
                className="w-8 h-8 rounded-full"
                alt="User Image"
              />
              <h1 className="text-white text-sm ml-2">Math Quiz</h1>
              <h1 className="text-white text-sm ml-24">Score: 25</h1>
            </div>
            
          </div>
          <div className="bg-black flex flex-col rounded-lg p-2 mb-2">
            <div className="flex items-center my-1 mx-2">
              <img
                src={Maths}
                className="w-8 h-8 rounded-full"
                alt="User Image"
              />
              <h1 className="text-white text-sm ml-2">Math Quiz</h1>
              <h1 className="text-white text-sm ml-24">Score: 25</h1>
            </div>
            
          </div>
          <div className="bg-black flex flex-col rounded-lg p-2">
            <div className="flex items-center my-1 mx-2">
              <img
                src={image2}
                className="w-8 h-8 rounded-full"
                alt="User Image"
              />
              <h1 className="text-white text-sm ml-2">Math Quiz</h1>
              <h1 className="text-white text-sm ml-24">Score: 25</h1>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
