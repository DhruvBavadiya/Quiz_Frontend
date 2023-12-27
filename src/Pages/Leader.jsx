/* eslint-disable no-unused-vars */
import React from 'react'
import LeaderBoard from '../Components/LeaderBoard';
import withAuth from '../Components/withAuth';

const Leader = () => {
  return (
    <div className='h-[100vh] flex flex-col ml-[16.66%] bg-black'>
        <div className='mt-5 mb-5'>
    <LeaderBoard className = "mt-6"/>
    </div>
    </div>
  )
}

export default withAuth(Leader)
