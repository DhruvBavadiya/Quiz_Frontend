import React from "react";
import Sidebar from "../Components/Sidebar";
import Quizblock from "../Components/Quizblock";
import Categories from "../Components/Categories";
import Leaderboard from "../Components/LeaderBoard";
import ImplementApi from "../Hooks/ImplementApi";

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
  { name: "Coding", description: "Sharpen your coding skills and knowledge." },
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
  { name: "Coding", description: "Sharpen your coding skills and knowledge." },
];


const data = [
  { name: 'John Doe', score: 120 },
  { name: 'Alice Smith', score: 95 },
  { name: 'Bob Johnson', score: 80 },
  { name: 'Eva Williams', score: 110 },
  { name: 'Charlie Brown', score: 65 },
];



const Home = () => {
  const { trendingSections, loading, error } = ImplementApi();

  console.log(trendingSections)
  return (
    <div className="flex flex-row">
      <div className="flex-col flex-1 ml-[16.666666%] bg-[#282828] text-white overflow-y-auto">
        <div className="text-left ">
          <h2 className="text-4xl text-white mt-8 mb-1.5 ml-8 font-bold">
            Featured Topics!
          </h2>
        </div>
        <div className="flex flex-wrap justify-evenly ml-4 mr-4 ">
          {trending.map((data) => {
            return (
              <div className="">
                <Quizblock Title={data.name} Description={data.description} />
              </div>
            );
          })}
        </div>
        <div className="text-left ">
          <h2 className="text-4xl text-white mt-8 mb-1.5 ml-8 font-bold">
            Categories of Quiz!
          </h2>
        </div>
        <div className="flex flex-wrap justify-evenly ml-4 mr-4 ">
        {Category.slice(0,8).map((data, index) => (
          <div key={index} className="w-1/8 p-4">
            {/* Render your category block here */}
            <Categories Title = {data.name}/>
          </div>
        ))}
      </div>
          <div className="mt-8">
          <Leaderboard data = {data}/>
          </div>
      </div>
    </div>
  );
};

export default Home;
