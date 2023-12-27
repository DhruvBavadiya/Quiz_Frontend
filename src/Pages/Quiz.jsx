/* eslint-disable no-unused-vars */
// Quiz.js
import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import Quizblock from "../Components/Quizblock";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { css } from "@emotion/react";
import withAuth from "../Components/withAuth";

const Quiz = () => {
  const navigate = useNavigate();
  const { trending, fetchTrending, category, fetchCategory } = useData();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [isOverflow, setIsOverflow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  const difficulties = ["Random", "Easy", "Medium", "Hard"];

  const handleClick = (data) => {
    setSectionId((prevSelected) =>
      prevSelected === data?.sectionId ? "" : data?.sectionId
    );

    setSelectedSubject((prevSelected) =>
      prevSelected === data?.category ? "" : data?.category
    );
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartExam = () => {
    // Check if both category, difficulty, and sectionId are selected
    if (selectedSubject && selectedDifficulty && sectionId) {
      // Navigate to the exam page with selectedSubject, selectedDifficulty, and sectionId
      navigate("/exam/instruction", {
        state: {
          selectedSubject,
          selectedDifficulty,
          sectionId,
        },
      });
    } else {
      // Display an alert if either category, difficulty, or sectionId is not selected
      alert("Please select category, difficulty, and sectionId before starting the exam.");
    }
  };

  useEffect(() => {
    // Fetch trending data only if it hasn't been fetched before
    if (!trending.length) {
      fetchTrending();
    }
  }, [trending, fetchTrending]);

  useEffect(() => {
    // Fetch category data only if it hasn't been fetched before
    if (!category.length) {
      fetchCategory();
    }
  }, [category, fetchCategory]);

  useEffect(() => {
    const contentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Check if content height is less than viewport height
    setIsOverflow(contentHeight > viewportHeight);
  }, []); // Run this effect only once on component mount

  const filteredCategories = category.filter((data) =>
    data.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (category.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ml-[16.66%] bg-[#282828]">
        <InfinitySpin color="#4fa94d" loading={loading} css={override} />
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#282828] ml-[16.66%] flex flex-col ${
        isOverflow ? "h-[100%]" : "h-[100%]"
      }`}
    >
      <div className="flex flex-col text-left ml-4">
        <h1 className="text-3xl text-white mt-10 ">Find Quizzes!!</h1>
        <div className="mt-6 flex flex-col md:flex-row md:items-center">
          <input
            className="mb-4 md:mb-0 px-4 md:px-20 py-2 rounded-3xl text-white bg-black opacity-70 text-center focus:border-none hover:border-none"
            placeholder="Search quizzes"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="ml-0 md:ml-4 lg:px-6 lg:py-2 text-white bg-red-600 rounded-3xl px-6 hover:scale-105 transition duration-200"
          >
            Submit
          </button>
        </div>
        <hr className="mt-10 opacity-20 mr-10" />

        <div className="mt-4">
          <h1 className="text-white text-lg mb-4">Select Subject</h1>
          <div className="flex flex-wrap justify-evenly mx-4">
            {filteredCategories.slice(0, 12).map((data, index) => (
              <div
                key={index}
                className="w-full md:w-1/3 lg:w-1/6 p-2 md:p-4 text-blue-500"
                onClick={() => handleClick(data)}
              >
                <Categories
                  category={data.category}
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
                  className="w-8"
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
            <button
              onClick={handleStartExam}
              className="w-full md:w-1/3 lg:w-1/6 px-2 py-1 md:p-2 text-center text-white bg-red-600 rounded-3xl hover:scale-105 transition duration-200"
            >
              Start Exam
            </button>
          </div>

          <hr className="mt-10 opacity-20 mr-10" />
        </div>
        <div>
          <h1 className="text-white text-lg mb-4 mt-1">Recommend For You</h1>
          <div className="flex flex-wrap justify-between mx-2 ">
            {trending?.slice(0, 4).map((data) => (
              <div className="" key={data.category}>
                <Quizblock
                img={data.image}
                  Title={data.category}
                  Description={data.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Quiz);
