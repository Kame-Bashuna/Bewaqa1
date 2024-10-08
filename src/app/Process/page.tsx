// "use client";

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false); 

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-between"> 
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <Image src="/images/bhetalogo.png" alt="Bheta Logo" width={150} height={100} className=''/>
//           <button className="md:hidden" onClick={toggleMenu}> 
//             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>
//           <nav className={`absolute md:static bg-white md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
//             <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-24 text-lg md:text-xl p-4 md:p-0">
//               <li><Link href="#" className="text-black hover:text-gray-900">Home</Link></li>
//               <li><Link href="#" className="text-red-600 hover:text-red-700 font-medium">Check Drug</Link></li>
//               <li><Link href="#" className="text-black hover:text-gray-900">Pharmacy Finder</Link></li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//       <main className="bg-white rounded-lg shadow-xl mx-auto p-4 sm:p-8 md:p-16 lg:p-32 w-full max-w-lg flex ring-black ring-offset-1 shadow-black">
//   <div className="text-sm sm:text-lg mb-4"> 
//     <p>
//       <span className="font-semibold">Name of the Drug:</span> Cetirizine
//     </p>
//     <br />
//     <p>
//       <span className="font-semibold">Status:</span> Recalled
//     </p>
//     <br />
//     <p>
//       <span className="font-semibold">Batch no:</span> 25690209-0
//     </p>
//     <br />
//     <p>
//       <span className="font-semibold">Manufacture Date:</span> 21-05-2024
//     </p>
//   </div>
// </main>


//       <div className="flex flex-col md:flex-row gap-10 md:gap-96 mx-auto mb-[1%]"> 
//         <button className="bg-white text-black border border-black px-4 py-6 rounded-lg w-full md:w-[200px] ">
//           Report Pharmacy
//         </button>
//         <button className="bg-slate-900 text-white px-4 py-6 rounded-lg w-full md:w-[200px]">
//           Share
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React from 'react';

import { useDrugData } from '../hooks/postImage';

export default function DrugInfoPage() {
  const { drugData, isLoading, error } = useDrugData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!drugData) return <div>No data available</div>;

  const isRecalled = drugData.status.toLowerCase().includes('recall');

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
            B
          </div>
          <span className="font-bold">Bheta Solution</span>
        </div>
        <nav>
          <a href="#" className="mx-2">Home</a>
          <a href="#" className="mx-2 text-red-500">Check Drug</a>
          <a href="#" className="mx-2">Pharmacy Finder</a>
        </nav>
      </header>

      <main className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Name of the Drug:</span>
            <span>{drugData.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={isRecalled ? "text-red-500" : ""}>{drugData.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Batch no:</span>
            <span>{drugData.batchNo}</span>
          </div>
          <div className="flex justify-between">
            <span>Manufacture Date:</span>
            <span>{new Date(drugData.manufactureDate).toLocaleDateString()}</span>
          </div>
        </div>

        {isRecalled && (
          <div className="bg-red-100 border border-red-500 p-2 rounded mb-4">
            <strong>This drug has been recalled.</strong>
          </div>
        )}
      </main>

      <div className="flex justify-between mt-8">
        <button className="bg-white text-black border border-black px-4 py-2 rounded">
          Report Pharmacy
        </button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded">
          Share
        </button>
      </div>
    </div>
  );
}
