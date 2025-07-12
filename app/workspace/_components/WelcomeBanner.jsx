import React from "react";

function WelcomeBanner() {
  return (
    <div className="p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 text-white rounded-xl shadow-md mb-6 w-full min-h-[100px] flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl mb-1 text-center drop-shadow-lg">
        Welcome to IRSDL LMS Portal
      </h2>
      <p className="text-base text-center drop-shadow">
        Your one-stop solution for all educational needs.
      </p>
    </div>
  );
}

export default WelcomeBanner;
