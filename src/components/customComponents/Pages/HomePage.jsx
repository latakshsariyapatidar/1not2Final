import React from 'react';

const HomePage = () => {
  return (
    <div className="w-full h-full p-8 pt-20 text-[#EAEAEA] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
          Welcome to Our
          <span className="block text-[#EAEAEA]">
            Production House
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#A0A0A0] text-center max-w-4xl mx-auto leading-relaxed">
          Where stories come to life through cinematic excellence and cutting-edge visual storytelling.
        </p>
        <div className="mt-12 text-center">
          <div className="inline-block w-32 h-0.5 bg-[#00B2A9] opacity-80"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;