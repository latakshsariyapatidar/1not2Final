import React from 'react';

const AboutPage = () => {
  return (
    <div className="w-full h-full p-8 pt-20 text-[#EAEAEA] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
          About Our
          <span className="block text-[#EAEAEA]">
            Vision
          </span>
        </h1>
        <p className="text-xl text-[#A0A0A0] text-center max-w-4xl mx-auto leading-relaxed mb-8">
          We are a creative production house dedicated to crafting compelling narratives 
          and bringing extraordinary visions to life through the art of filmmaking.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-[#00B2A9]">Our Mission</h3>
            <p className="text-[#A0A0A0]">Creating unforgettable cinematic experiences</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-[#00B2A9]">Our Values</h3>
            <p className="text-[#A0A0A0]">Innovation, creativity, and storytelling excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;