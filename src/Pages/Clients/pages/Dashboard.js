import React from 'react'
import Form from './Form'

function Dashboard() {
  return (
    <div className='h-screen'>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4">
          <h2 className=" w-full text-6xl bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent font-bold">
            Lets make Graphs
          </h2>
          <div className="bg-gradient-to-tl from-blue-600 to-violet-600 ml-4 h-0.5 md:w-full w-0"></div>
        </div>
        <p className="text-gray-400 text-justify mt-8">
          Our products/services have earned the trust of customers from all corners of the globe. Whether you're a small business looking to scale, a large enterprise optimizing operations, or an individual seeking high-quality solutions, we are proud to deliver exceptional results that meet diverse needs.
        </p>
      </div>
      <Form></Form>
    </div>
  )
}

export default Dashboard
