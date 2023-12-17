/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Maths from "../assets/maths.jpg";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const Quizblock = (props) => {
  return (
    <div className="w-full h-full md:w-full p-4  bg-[#3f3f3f] hover:scale-105 transition duration-200 rounded-xl">
      <div className="flex flex-col static ">
        <div>
          <img
            src={Maths}
            className="bg-cover h-28 w-[16.5rem] rounded-2xl bg-center"
          />
        </div>
        <div className="relative bg-black text-white font-semibold px-4 w-fit py-1  rounded-full bottom-4 left-3">
          {props.Title}
        </div>
        <div>
        <div className="text-white text-sm font-semibold text-left">Difficulty</div>
          <div className="flex flex-row font-semibold text-white justify-between items-center text-sm mt-4">
            <div className="flex items-center justify-center">
              <WatchLaterIcon className=""/>
               <span className="ml-2">30 Min</span> 
              </div>
              <button className="bg-[#040D12] py-2 px-6 rounded-xl">start</button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Quizblock;
