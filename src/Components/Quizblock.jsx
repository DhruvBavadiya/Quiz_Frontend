/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Maths from "../assets/maths.jpg";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useNavigate } from "react-router-dom";

const Quizblock = (props) => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [selectedSubject,setSelectedSubject] = useState("")

  const handleClick = () => {
    // Navigate to quiz instruction page with selected difficulty
    navigate(`/exam/instruction`,{
      state:{
        selectedDifficulty,
        selectedSubject:props.Title,
        sectionId:props.sectionId
      }
    });
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <div className="w-full h-full md:w-full p-4 bg-[#3f3f3f] rounded-xl">
      <div className="flex flex-col static">
        <div>
          <img
            src={props.img}
            className="bg-cover h-28 w-[16.5rem] rounded-2xl bg-center"
            alt="subject image"
          />
        </div>
        <div className="relative bg-black text-white font-semibold px-4 w-fit py-1 rounded-full bottom-4 left-3">
          {props.Title}
        </div>
        <div>
          <div className="flex justify-start items-center align-middle  text-white text-sm font-semibold text-left">
            <div>Difficulty</div>
            <div className="relative inline-block text-left ml-2">
              <select
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                className="rounded-md bg-[#282828] text-white border-2 border-gray-500 px-2 py-1 focus:outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Random">Random</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                
              </div>
            </div>
          </div>
          
          <div className="flex flex-row font-semibold text-white justify-between items-center text-sm mt-4">
            <div className="flex items-center justify-center">
              <WatchLaterIcon className="" />
              <span className="ml-2">30 Min</span>
            </div>
            
            <button
              onClick={handleClick}
              className="bg-[#040D12] py-2 px-6 rounded-xl"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizblock;
