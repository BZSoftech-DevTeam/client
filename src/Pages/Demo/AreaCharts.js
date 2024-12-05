import React from 'react'
import logo from '../../Assets/logos.png'
import { Link } from 'react-router-dom'

function AreaCharts() {
    return (
        <div>
            <div className='space-y-4'>

                <div className='flex items-center justify-start'>
                    <img src={logo} alt="err" width={32} />
                    <h1 className='text-2xl font-bold text-blue-800 mx-4'>Area Charts</h1>
                </div>

                <div class="flex items-center justify-center space-x-4">
                    <div className='h-full border border-slate-100 w-full'>
                        <Link>
                            <div className='h-32 bg-blue-200 w-full'></div>
                            <div className='h-12 bg-red-200 w-full flex items-center justify-center'>
                                <h1 className='font-semibold'>Line Chart</h1>
                            </div>
                        </Link>
                    </div>
                    <div className='h-full border border-slate-100 w-full'>
                        <Link>
                            <div className='h-32 bg-blue-200 w-full'></div>
                            <div className='h-12 bg-red-200 w-full flex items-center justify-center'>
                                <h1 className='font-semibold'>Splined Line Chart</h1>
                            </div>
                        </Link>
                    </div>
                    <div className='h-full border border-slate-100 w-full'>
                        <Link>
                            <div className='h-32 bg-blue-200 w-full'></div>
                            <div className='h-12 bg-red-200 w-full flex items-center justify-center'>
                                <h1 className='font-semibold'>Forecast Chart</h1>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AreaCharts
