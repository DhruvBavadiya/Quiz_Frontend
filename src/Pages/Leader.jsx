/* eslint-disable no-unused-vars */
import React from 'react'
import LeaderBoard from '../Components/LeaderBoard';
import { Leaderboard } from '@mui/icons-material';

const Leader = () => {
  const data = [
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
 
  return (
    <div className='h-[100vh] flex flex-col ml-[16.66%] bg-black'>
        <div className='mt-5 mb-5'>
    <LeaderBoard className = "mt-6"/>
    </div>
    </div>
  )
}

export default Leader
