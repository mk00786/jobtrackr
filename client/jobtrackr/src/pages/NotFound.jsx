import React from 'react'
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center mt-10'>
      <h1 className='text-3xl font-bold mb-4'>404-Page Not Found</h1>
      <p className='mb-4'>The page you are looking for doesn't exists.</p>
      <Link to='/' className='underline text-blue-500'>Go to dashboard</Link>
    </div>
  )
}

export default NotFound
