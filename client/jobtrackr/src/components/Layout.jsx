import React from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {toast} from 'react-toastify';

const Layout = () => {
  const navigate=useNavigate();
  const {logout}=useAuth();

  const handleLogout=()=>{
    logout();
    toast.success('Logged Out Successfully');
    navigate('/login');
  }

  return (
    <div className='min-h-screen flex'>
        <aside className='w-64 bg-gray-900 text-white px-6 py-8 shadow-lg'>
            <h2 className='text-3xl font-extrabold mb-10 tracking-wide'>JobTracker</h2>
            <nav className='flex flex-col gap-4'>
            <NavLink to='/' className={({ isActive }) =>
              `transition px-2 rounded hover:text-yellow-300 ${
                isActive ? 'font-bold text-yellow-400' : 'text-white'
              }`
            } >Dashboard</NavLink>

          <NavLink to='/add-job' className={({ isActive }) =>
              `transition px-2 rounded hover:text-yellow-300 ${
                isActive ? 'font-bold text-yellow-400' : 'text-white'
              }`
            } >Add Job</NavLink>

          <NavLink to='/stats' className={({ isActive }) =>
              `transition px-2 rounded hover:text-yellow-300 ${
                isActive ? 'font-bold text-yellow-400' : 'text-white'
              }`
            } >Stats</NavLink>

          <button  className='mt-1 text-left px-2 py-1 text-red-500 hover:text-red-600 transition font-medium' onClick={handleLogout}>
                  Logout
                </button>
            </nav>
        </aside>

        <main className='flex-1 p-8 bg-gray-100'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout
