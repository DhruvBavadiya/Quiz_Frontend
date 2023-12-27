/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const HomeLeaderBoard = () => {

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            let apiUrl = '';
    
              apiUrl = 'https://quiz-app-pj53.onrender.com/app/v1/getdaily';
    
            const response = await fetch(apiUrl);
            const result = await response.json();
            // Assuming the response has a 'data' property with an array of users
            setdata(result.users || []);
    
          } catch (error) {
            console.error('Error fetching leaderboard data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

  return (
    <section className="text-white body-font bg-[#3f3f3f] h-[100%] border-white  mx-24 rounded-lg">
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
              {data.slice(0,5).map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3 text-lg">{user.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  );
};

export default HomeLeaderBoard;
