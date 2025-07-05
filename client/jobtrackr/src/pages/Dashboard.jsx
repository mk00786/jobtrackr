import React from 'react'
import JobCard from '../components/JobCard'
import jobs from '../data/jobs'

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {jobs.map(job=><JobCard key={job.id} job={job}/>)}
      </div>
    </div>
  )
}

export default Dashboard
