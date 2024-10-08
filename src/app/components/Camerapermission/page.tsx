// "use client";
// import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const Camerapermission = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null); 
//   const canvasRef = useRef<HTMLCanvasElement | null>(null); 
//   const router = useRouter();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null); 
//   const [cameraStarted, setCameraStarted] = useState(false);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream; 
//         setCameraStarted(true);
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   const captureImage = async () => {
//     if (!cameraStarted) {
//       await startCamera();
//     }

//     if (canvasRef.current && videoRef.current) {
//       const context = canvasRef.current.getContext('2d'); 
//       if (context) {
//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;
        
//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageDataUrl = canvasRef.current.toDataURL('image/jpeg'); 
//         setCapturedImage(imageDataUrl);
//       }
//     }
//   };

//   const handleUpload = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       router.push('/Process');
//     }, 3000);
//   };

//   const handleBack = () => {
//     setCapturedImage(null);
//     setCameraStarted(false); 
//   };

//   useEffect(() => {
    
//     startCamera();
    
//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream;
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div id='permission' className="min-h-screen bg-gray-100 flex flex-col">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <Image src="/images/bhetalogo.png" alt="Bheta Logo" width={100} height={40} />
//           <nav>
//             <ul className="flex space-x-4">
//               <li><Link href="#" className="text-gray-600 hover:text-gray-900">Home</Link></li>
//               <li><Link href="#" className="text-red-600 hover:text-red-700 font-medium">Check Drug</Link></li>
//               <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pharmacy Finder</Link></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
//         <div className="w-full max-w-3xl relative">
//           {isProcessing ? (
//             <div className="text-center">
//               <p className="mb-4">Processing...</p>
//               <div className="w-full h-2 bg-gray-200 rounded">
//                 <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
//               </div>
//             </div>
//           ) : capturedImage ? (
//             <>
//               <img src={capturedImage} alt="Captured" className="w-full h-64 object-cover mb-4" />
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={handleBack}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 >
//                   Back
//                 </button>

//                 <Link href="/components/Process">
//                   <button
//                     onClick={handleUpload}
//                     className="px-4 py-2 bg-slate-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     Upload
//                   </button>
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <>
//               <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover mb-4 rounded-lg" />
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
//                 <button 
//                   onClick={captureImage}
//                   className="w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <div className="w-12 h-12 bg-black rounded-full"></div>
//                 </button>
//               </div>
//             </>
//           )}
//           <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Camerapermission;

"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Camerapermission = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  const canvasRef = useRef<HTMLCanvasElement | null>(null); 
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); 
  const [cameraStarted, setCameraStarted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); 
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }
        } 
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream; 
        setCameraStarted(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = async () => {
    if (!cameraStarted) {
      await startCamera();
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d'); 
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 1.0); 
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/Process');
    }, 3000);
  };

  const handleBack = () => {
    setCapturedImage(null);
    setCameraStarted(false); 
  };



  useEffect(() => {
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div id='permission' className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Image src="/images/bhetalogo.png" alt="Bheta Logo" width={100} height={40} />
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="#" className="text-red-600 hover:text-red-700 font-medium">Check Drug</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pharmacy Finder</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl relative">
          {isProcessing ? (
            <div className="text-center">
              <p className="mb-4">Processing...</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
              </div>
            </div>
          ) : capturedImage ? (
            <>
              <img src={capturedImage} alt="Captured" className="w-full h-64 object-cover mb-4" />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Back
                </button>
                
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-slate-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Upload
                </button>
              </div>
            </>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover mb-4 rounded-lg" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button 
                  onClick={captureImage}
                  className="w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="w-12 h-12 bg-black rounded-full"></div>
                </button>
              </div>
          
            </>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
        </div>
      </main>
    </div>
  );
};

export default Camerapermission;
