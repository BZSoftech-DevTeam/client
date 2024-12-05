import React from 'react';
import { Link } from 'react-router-dom';
import HeroGraph from './HeroGraph';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';

function Hero() {
  return (
    <div className='bg-blue-50'>
      <div className='max-w-[80rem] mx-auto py-12 space-y-8'>

        <div className='flex flex-col items-start justify-center'>
          <h1 className="block font-light text-gray-800 text-4xl md:text-5xl lg:text-6xl">
            <span className="pr-4 bg-clip-text font-bold bg-gradient-to-tl  text-8xl from-blue-600 to-violet-600 text-transparent">
              Visualization
            </span>
            Simplified
          </h1>

          <div className='flex items-end justify-between space-y-4 w-full'>
            <div className='space-y-4'>
              <p className='text-lg font-semibold max-w-xl text-justify'>
                Preline UI is an open-source set of prebuilt UI components, ready-to-use examples and Figma design system based on the utility-first Tailwind CSS framework.
              </p>
              <SignedIn>
                <Link
                  to='/dashboard'
                  className="relative group inline-block py-2 px-4 text-sm text-blue-50 rounded-sm overflow-hidden transition duration-300 bg-gradient-to-tl from-blue-600 to-violet-600">
                  <div className="absolute top-0 right-full w-full h-full bg-slate-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                  <span className="relative font-semibold">
                    Go to  Dashboard
                  </span>
                </Link>
              </SignedIn>
              <SignedOut>
                <button
                  className="relative group inline-block py-2 px-4 text-sm text-blue-50 rounded-sm overflow-hidden transition duration-300 bg-gradient-to-tl from-blue-600 to-violet-600">
                  <div className="absolute top-0 right-full w-full h-full bg-slate-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                  <span className="relative font-semibold">
                    <SignUpButton mode='modal'>Try For Free</SignUpButton>
                  </span>
                </button>
              </SignedOut>
            </div>

            <div className='flex items-center justify-center space-x-12'>
              <div className="text-start">
                <h4 className="text-5xl font-bold text-blue-900">
                  250+
                </h4>
                <h4 className="text-md font-semibold text-blue-900">
                  Charts & Graphs
                </h4>
              </div>
              <div className="text-start">
                <h4 className="text-5xl font-bold text-blue-900">
                  250+
                </h4>
                <h4 className="text-md font-semibold text-blue-900">
                  Charts & Graphs
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <HeroGraph />
        </div>

      </div>
    </div>
  );
}

export default Hero;
