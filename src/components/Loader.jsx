import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Main loader container */}
      <div className="flex flex-col items-center">
        {/* Logo container with "M" animation */}
        <div className="relative mb-8">
          {/* Capital M with animation */}
          <div className="w-20 h-20 flex items-center justify-center">
            <span className="text-5xl font-bold text-slate-800 animate-slide-m">TNB Mail</span>
          </div>
          
          {/* Subtle pulse effect */}
          <div className="absolute inset-0 bg-slate-800 rounded-lg opacity-20 animate-ping"></div>
        </div>

        {/* Professional spinner */}
        <div className="relative">
          {/* Main spinner ring */}
          <div className="w-12 h-12 border-3 border-gray-200 border-t-slate-800 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        {/* <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm font-medium tracking-wide">Loading...</p>
        </div>

        {/* Progress bar */}
        {/* <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800 rounded-full animate-progress"></div>
        </div> */}

        {/* Optional status text */}
        <div className="mt-3">
          <p className="text-xs text-gray-400 font-normal">Please wait</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { 
            width: 0%;
            opacity: 0.8;
          }
          50% { 
            width: 60%;
            opacity: 1;
          }
          100% { 
            width: 100%;
            opacity: 0.8;
          }
        }

        @keyframes slide-m {
          0% {
            transform: translateX(100%) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translateX(50%) scale(0.75);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }

        .animate-slide-m {
          animation: slide-m 1s ease-out forwards;
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default Loader;