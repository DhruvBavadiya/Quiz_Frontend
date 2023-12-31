import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import withAuth from "../Components/withAuth";

const Instructionbox = () => {
  //  console.log()
  const location = useLocation();
  
  const {
    state: {
      selectedSubject,
      selectedDifficulty,
      sectionId
    },
  } = location;

  console.log(selectedSubject,sectionId,selectedDifficulty)
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/exam/${selectedSubject.toLowerCase()}/${selectedDifficulty.toLowerCase()}`,{
          state:{
            selectedDifficulty,
            selectedSubject,
            sectionId
          }
        });
    }

  return (
    <div className="flex flex-col ml-[16.66%] items-center justify-center h-[100vh]  bg-[#282828]">
      <div className="flex flex-col w-[75%] px-12 py-4 mb-4 border-blue-500 text-white rounded-lg border-[2.5px]">
        <span className="font-bold text-white text-4xl mb-1 ">
          Instructions
        </span>
        <hr className="border border-x-8 border-black" />
        <div className="space-y-3 text-xl">
          <div className="mt-4">
            <li>
              This is a FREE online test. Beware of scammers who ask for money
              to attend this test.
            </li>
          </div>
          <div>
            <li>Total number of questions: 20.</li>
          </div>
          <div>
            <li>Each question carries 1 mark; there are no negative marks.</li>
          </div>
          <div>
            <li>Time allotted: 30 minutes.</li>
          </div>
          <div>
            <li>DO NOT refresh the page.</li>
          </div>
          <div>
            <li>All the best!</li>
          </div>
        </div>
        <div className="text-center mt-8">
          {/* Use SingleSelect within Instructionbox */}
        </div>
        </div>
        <button onClick={handleClick} className="ml-8 text-white rounded-xl py-4 px-12 bg-black ">Start Exam</button>
      </div>
  );
};

export default withAuth(Instructionbox);
