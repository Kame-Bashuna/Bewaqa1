"use client";
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Image src="/images/bhetalogo.png" alt="Bheta Logo" width={150} height={100} />
          <button className="md:hidden" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav className={`absolute md:static bg-white md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-24 text-lg md:text-xl p-4 md:p-0">
              <li><Link href="#" className="text-black hover:text-gray-900">Home</Link></li>
              <li><Link href="#" className="text-red-600 hover:text-red-700 font-medium">Check Drug</Link></li>
              <li><Link href="#" className="text-black hover:text-gray-900">Pharmacy Finder</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mt-32 flex items-center justify-center bg-white text-lg md:text-xl p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl md:space-x-32">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <Image 
                src="/images/drug.png" 
                alt="Drug packaging example" 
                width={1600} 
                height={800} 
                className="w-{100%}" 
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className='w-full mb-4'>
              <p className="text-base md:text-lg lg:text-2xl ">
                Please take a <span className="font-bold">clear</span> and well-lit picture of the drug 
                packaging where the <span className="font-bold">batch number</span> is printed.
              </p>

              <p className="text-base md:text-lg lg:text-2xl">
                Make sure the entire batch number is <span className="font-bold">fully visible</span> 
                and in focus, avoiding any glare or obstructions that 
                could obscure the text.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-40 ">
              <button className="w-full md:w-auto px-8 py-3 border-black  ring-offset-1 ring-black shadow-black bg-transparent border-2 text-gray-700 rounded ">
                Back
              </button>

              <Link href="/components/Camera">
                <button className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded transition-colors"> Take a picture </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
