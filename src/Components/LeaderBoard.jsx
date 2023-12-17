/* eslint-disable jsx-a11y/anchor-is-valid */
// LeaderboardComponent.js
import React from 'react';

const LeaderBoard = ({ data }) => {
  return (
    <section className="text-white body-font bg-[#3f3f3f]  border-white  mx-24 rounded-lg">
      <div className="container py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Leaderboard</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">See the top performers on the leaderboard.</p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider  text-gray-950 text-md font-bold bg-gray-100 rounded-tl rounded-bl">Rank</th>
                <th className="px-4 py-3 title-font tracking-wider  text-gray-950 text-md font-bold bg-gray-100">Name</th>
                <th className="px-4 py-3 title-font tracking-wider  text-gray-950 text-md font-bold bg-gray-100">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-lg">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-4 lg:w-fit w-auto mx-auto hover:scale-105">
          <a href="#" className="text-white hover:text-[#040D12]  inline-flex items-center md:mb-2 lg:mb-0">Go to Leader board page
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
      </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
