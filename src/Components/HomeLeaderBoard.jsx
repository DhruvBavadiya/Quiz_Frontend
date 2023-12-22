import React, { useEffect, useState } from 'react';

const HomeLeaderBoard = () => {

    const dailydata = [
        { name: 'John Doe', score: 120 },
        { name: 'Alice Smith', score: 95 },
        { name: 'Bob Johnson', score: 80 },
        { name: 'Eva Williams', score: 110 },
        { name: 'Charlie Brown', score: 65 },
        { name: 'Alice Smith', score: 95 },
        { name: 'Bob Johnson', score: 80 },
        { name: 'Eva Williams', score: 110 },
        { name: 'Charlie Brown', score: 65 },
      ];
      const [data,setdata] = useState(dailydata)

      useEffect(()=>{setdata(data)},[data])

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
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-lg">{user.score}</td>
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