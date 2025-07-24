import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import api from '../../utils/api'
import {FiEdit,FiTrash2} from 'react-icons/fi'
import { Loader2 } from 'lucide-react'

const JobCard = ({job,refreshJobs}) => {
  const navigate=useNavigate();
  const {token}=useAuth();
  const [deleting,setDeleting]=useState(false);

  if(!job) return null;

  const handleDelete=async ()=>{
    if(!window.confirm('Are you really want to delete this job')) return;

    try{
      setDeleting(true);
      await api.delete(`/auth/jobs/${job._id}`,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      );
      toast.success('Job deleted successfully');
      refreshJobs();//Refresh jobs after delete
    }catch(err){
      console.error(err);
      toast.error('Job delete Failed')
    }finally{
      setDeleting(false);
    }
  }

  const getStatusStyle=(status)=>{
    switch(status){
      case 'Applied':
        return 'text-blue-800 bg-blue-100';
      case 'Interviewing':
        return 'text-yellow-800 bg-yellow-100';
      case 'Offered':
        return 'text-green-800 bg-green-100';
      case 'Rejected':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className='border p-4 mb-4 rounded shadow hover:shadow-md transition cursor-pointer'
    onClick={()=>navigate(`/job/${job._id}`)}>
      <h3 className='text-lg font-bold'>{job.title}</h3>
      <p className='text-gray-600'>{job.company} • {job.location}</p>
      <span className={`inline-block mt-3 px-2 py-1 text-xs rounded-full 
        ${getStatusStyle(job.status)}`}>
        {job.status?job.status.charAt(0).toUpperCase() + job.status.slice(1):'Unknown'}
      </span>
      <div className='flex space-x-2 mt-4'>

        <button aria-label='Edit Job' className='flex items-center bg-yellow-500 hover:bg-yellow-600 
        transition text-white px-3 py-1 rounded' disabled={deleting} 
        onClick={(e)=>{
          e.stopPropagation();
          navigate(`/edit-job/${job._id}`)}
          }>
        <FiEdit className='mr-1'/>Edit</button>

        <button aria-label='Delete Job ..' className='flex items-center bg-red-500 hover:bg-red-600 
        transition text-white px-3 py-1 rounded' 
        onClick={(e)=>{
          e.stopPropagation();
          handleDelete();
        }} disabled={deleting}>
        <FiTrash2 className='mr-1'/>{deleting?<Loader2 className='animate-spin h-4 w-4'/>:'Delete'}</button>
      </div>

      <p className='text-sm text-gray-500'>Posted on {job.createdAt?new Date(job.createdAt).toLocaleString('en-IN',{
        year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'
      }):'N/A'}</p>
    </div>
  )
}

export default JobCard
