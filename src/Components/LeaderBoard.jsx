/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useState, useEffect, useMemo } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
const LeaderBoard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let apiUrl = '';

        if (selectedPeriod === 'daily') {
          apiUrl = 'https://quiz-app-pj53.onrender.com/app/v1/getdaily';
        } else if (selectedPeriod === 'weekly') {
          apiUrl = 'https://quiz-app-pj53.onrender.com/app/v1/getweekly';
        } else if (selectedPeriod === 'monthly') {
          apiUrl = 'https://quiz-app-pj53.onrender.com/app/v1/getmonthly';
        }

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
  }, [selectedPeriod]);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <InfinitySpin color="#4fa94d" loading={loading} css={override} />
        <div>Loading</div>
      </div>
    );
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  

  return (
    <section className="text-white body-font bg-[#3f3f3f] h-[100%] border-white mx-24 rounded-lg">
      <div className="container py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Leaderboard</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">See the top performers on the leaderboard.</p>
        </div>

        {/* Period selection buttons */}
        <div className="flex justify-center mb-5">
          <button
            className={`mx-2  px-4 py-2 text-md font-bold ${
              selectedPeriod === 'daily' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'
            } rounded`}
            onClick={() => handlePeriodChange('daily')}
          >
            Daily
          </button>
          <button
            className={`mx-2 px-4 py-2 text-md font-bold ${
              selectedPeriod === 'weekly' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'
            } rounded`}
            onClick={() => handlePeriodChange('weekly')}
          >
            Weekly
          </button>
          <button
            className={`mx-2 px-4 py-2 text-md font-bold ${
              selectedPeriod === 'monthly' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'
            } rounded`}
            onClick={() => handlePeriodChange('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider text-gray-950 text-md font-bold bg-gray-100 rounded-tl rounded-bl">Rank</th>
                <th className="px-4 py-3 title-font tracking-wider text-gray-950 text-md font-bold bg-gray-100">Name</th>
                <th className="px-4 py-3 title-font tracking-wider text-gray-950 text-md font-bold bg-gray-100">Score</th>
              </tr>
            </thead>
            <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.username}</td>
                {selectedPeriod === "daily" ? (
                  <td className="px-4 py-3 text-lg">{user.DailyScore}</td>
                ) : selectedPeriod === "weekly" ? (
                  <td className="px-4 py-3 text-lg">{user.WeeklyScore}</td>
                ) : (
                  <td className="px-4 py-3 text-lg">{user.MonthlyScore}</td>
                )}
              </tr>
            ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
