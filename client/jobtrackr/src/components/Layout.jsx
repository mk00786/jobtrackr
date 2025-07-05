import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen flex'>
        <aside className='w-64 bg-gray-800 text-white p-4'>
            <h2 className='text-2xl font-bold mb-6'>JobTracker</h2>
            <nav className='flex flex-col gap-2'>
                <NavLink to='/' className={({isActive})=>`hover:text-yellow-300 ${isActive?'font-bold text-yellow-400':''}`}>Dashboard</NavLink>
                <NavLink to='/add-job' className={({isActive})=>`hover:text-yellow-300 ${isActive?'font-bold text-yellow-400':''}`}>Add Job</NavLink>
                <NavLink to='/stats' className={({isActive})=>`hover:text-yellow-300 ${isActive?'font-bold text-yellow-400':''}`}>Stats</NavLink>
            </nav>
        </aside>

        <main className='flex-1 p-6 bg-gray-100'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout
