/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Quizblock from "../Components/Quizblock";
import Categories from "../Components/Categories";
import Leaderboard from "../Components/LeaderBoard";
import HomeLeaderBoard from "../Components/HomeLeaderBoard";
import useGenericApi from "../Hooks/useGenericApi";
import { useData } from '../Context/DataContext';
import { css } from "@emotion/react";
import { InfinitySpin } from "react-loader-spinner";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = () => {
  const { trending, fetchTrending, category, fetchCategory } = useData();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickCategory = (data) => {
    // If the same category is clicked again, deselect it
    const newSelectedSubject = selectedSubject === data?.category ? "" : data?.category;
    setSelectedSubject(newSelectedSubject);

    // Reset related states when deselecting a category
    if (!newSelectedSubject) {
      setSelectedDifficulty("");
      setSectionId("");
      setShowDifficultySelection(false);
    } else {
      setShowDifficultySelection(true);
    }

    setSectionId((prevSelected) =>
      prevSelected === data?.sectionId ? "" : data?.sectionId
    );
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);

    navigate('exam/instruction', {
      state: {
        selectedDifficulty: difficulty,
        selectedSubject,
        sectionId,
      },
    });
  };

  useEffect(() => {
    // Fetch trending data only if it hasn't been fetched before
    if (!trending.length) {
      fetchTrending();
    }
  }, [trending]);

  useEffect(() => {
    // Fetch category data only if it hasn't been fetched before
    if (!category.length) {
      fetchCategory();
    }
  }, [category]);

  if (category.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ml-[16.66%] bg-[#282828]">
        <InfinitySpin color="#4fa94d" loading={loading} css={override} />
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row" style={{ overflowY: 'auto' }}>
      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex-col flex-1 ml-[16.666666%] bg-[#282828] text-white overflow-y-auto">
        <div className="text-left">
          <h2 className="text-4xl text-white mt-8 mb-1.5 ml-8 font-bold">
            Featured Topics!
          </h2>
        </div>
        <div className="flex flex-wrap justify-evenly ml-4 mr-4">
          {trending?.slice(0, 4).map((data) => (
            <div key={data.category} className="hover:scale-105 transition duration-200">
              <Quizblock Title={data.category} img={data.image} sectionId={data.sectionId} />
            </div>
          ))}
        </div>
        <div className="text-left">
          <h2 className="text-4xl text-white mt-8 mb-1.5 ml-8 font-bold">
            Categories of Quiz!
          </h2>
        </div>
        <div className="flex flex-wrap justify-evenly ml-4 mr-4">
          {category?.slice(0, 8).map((data) => (
            <div key={data.category} className="w-1/4 p-4" onClick={() => handleClickCategory(data)}>
              <Categories category={data.category} selectedSubject={selectedSubject} />
            </div>
          ))}
        </div>
        {showDifficultySelection && (
          <div className="text-left mt-4 ml-8 flex items-center">
            <h2 className="text-4xl text-white mb-1.5 font-bold">Choose Difficulty:</h2>
            <div className="flex space-x-4 ml-4">
              <button onClick={() => handleDifficultyChange("Easy")} className="text-white bg-black hover:scale-105 transition duration-100 px-4 py-2 rounded-xl">Easy</button>
              <button onClick={() => handleDifficultyChange("Medium")} className="text-white bg-black hover:scale-105 transition duration-100 px-4 py-2 rounded-xl">Medium</button>
              <button onClick={() => handleDifficultyChange("Hard")} className="text-white bg-black hover:scale-105 transition duration-100 px-4 py-2 rounded-xl">Hard</button>
              <button onClick={() => handleDifficultyChange("Random")} className="text-white bg-black hover:scale-105 transition duration-100 px-4 py-2 rounded-xl">Random</button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <HomeLeaderBoard className="h-5" />
        </div>
        <div className="flex pl-4 mt-4 mb-2 lg:w-fit w-auto mx-auto hover:scale-105">
          <Link
            to="/leaderboard"
            className="text-white hover:text-[#040D12] inline-flex items-center md:mb-2 lg:mb-0"
          >
            Go to Leaderboard page
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
