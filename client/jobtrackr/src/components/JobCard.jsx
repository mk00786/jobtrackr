import React from 'react'

const JobCard = ({job}) => {
  return (
    <div className='bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all mb-4'>
      <h3 className='text-lg font-semibold'>{job.title}</h3>
      <p className='text-sm text-gray-600'>{job.company}</p>
      <p className='text-sm text-gray-500'>{job.location}</p>
      <span className={`inline-block mt-3 px-2 py-1 text-xs rounded-full 
      ${job.status==='Applied'?'bg-blue-100 text-blue-800':job.status==='Interviewing'?
      'bg-yellow-100 text-yellow-800':'bg-green-100 text-green-800'}`}>{job.status}</span>
    </div>
  )
}

export default JobCard
