import React from 'react'
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='flex items-center justify-start max-w-[80rem] mx-auto mt-12 bg-red-200'>
            <div className='bg-red-500 w-1/4 h-96 p-12'>
                ada
            </div>
            <div className='bg-red-900 w-full h-96 p-12'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Layout
