import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import Quizblock from "../Components/Quizblock";

const Quiz = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isOverflow, setIsOverflow] = useState(false);

  const trending = [
    { name: "Physics", description: "Dive into Knowledge of physics." },
    { name: "Gk", description: "Get test yourself with general Knowledge." },
    { name: "Maths", description: "Let's test maths with your logic." },
    { name: "Maths", description: "Let's test maths with your logic." },
  ];

  const Category = [
    { name: "Physics", description: "Dive into Knowledge of physics." },
    { name: "Gk", description: "Get test yourself with general Knowledge." },
    { name: "Maths", description: "Let's test maths with your logic." },
    { name: "Biology", description: "Explore the world of living organisms." },
    { name: "History", description: "Travel through the pages of history." },
    {
      name: "Technology",
      description: "Stay updated with the latest tech trends.",
    },
    {
      name: "Literature",
      description: "Immerse yourself in the world of literature.",
    },
    {
      name: "Coding",
      description: "Sharpen your coding skills and knowledge.",
    },
    { name: "Biology", description: "Explore the world of living organisms." },
    { name: "History", description: "Travel through the pages of history." },
    {
      name: "Technology",
      description: "Stay updated with the latest tech trends.",
    },
    {
      name: "Literature",
      description: "Immerse yourself in the world of literature.",
    },
    {
      name: "Coding",
      description: "Sharpen your coding skills and knowledge.",
    },
  ];

  const difficulties = ["Random", "Easy", "Medium", "Hard"];

  const handleClick = (data) => {
    setSelectedSubject((prevSelected) =>
      prevSelected === data?.name ? "" : data?.name
    );
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  useEffect(() => {
    const contentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Check if content height is less than viewport height
    setIsOverflow(contentHeight > viewportHeight);
  }, []); // Run this effect only once on component mount

  return (
    <div className={`bg-[#282828] ml-[16.66%] flex flex-col ${isOverflow ? "overflow-y-auto scrollbar-none" : "h-[100vh]"}`}>

      <div className="flex flex-col text-left ml-4">
        <h1 className="text-3xl text-white mt-10 ">Find Quizzes!!</h1>
        <div className="mt-6 flex flex-col md:flex-row md:items-center">
          <input
            className="mb-4 md:mb-0 px-4 md:px-20 py-2 rounded-3xl text-white bg-black opacity-70 text-center focus:border-none hover:border-none"
            placeholder="Search quizzes"
          />
          <button className="ml-0 md:ml-4 lg:px-6 lg:py-2 text-white bg-red-600 rounded-3xl px-6 hover:scale-105 transition duration-200">
            Submit
          </button>
        </div>
        <hr className="mt-10 opacity-20 mr-10" />

        <div className="mt-4">
          <h1 className="text-white text-lg mb-4">Select Subject</h1>
          <div className="flex flex-wrap justify-evenly mx-4">
            {Category.slice(0, 12).map((data, index) => (
              <div
                key={index}
                className="w-full md:w-1/3 lg:w-1/6 p-2 md:p-4 text-blue-500"
                onClick={() => handleClick(data)}
              >
                <Categories
                  Title={data.name}
                  selectedSubject={selectedSubject}
                />
              </div>
            ))}
          </div>
          <hr className="mt-10 opacity-20 mr-10" />
        </div>

        <div className="mt-4">
          <h1 className="text-white text-lg mb-2">Choose Difficulty</h1>
          <div className="flex flex-wrap justify-center mx-2">
          {difficulties.map((difficulty, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 lg:w-1/6 px-2 py-1 md:p-2 text-red-500"
            >
              <input
                type="radio"
                id={`difficulty-${index}`}
                name="difficultyRadio"
                checked={selectedDifficulty === difficulty}
                onChange={() => handleDifficultyChange(difficulty)}
              />
              <label
                htmlFor={`difficulty-${index}`}
                className="ml-2 text-lg text-white font-bold"
              >
                {difficulty}
              </label>
            </div>
          ))}
          <button className="w-full md:w-1/3 lg:w-1/6 px-2 py-1 md:p-2 text-center text-white bg-red-600 rounded-3xl hover:scale-105 transition duration-200">
            Start Exam
          </button>
        </div>
        
        
          <hr className="mt-10 opacity-20 mr-10" />
        </div>
        <div>
        <h1 className="text-white text-lg mb-4 mt-1">Recommand For you</h1>
        <div className="flex flex-wrap justify-between mx-2 ">
          {trending.map((data) => {
            return (
              <div className="">
                <Quizblock Title={data.name} Description={data.description} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
