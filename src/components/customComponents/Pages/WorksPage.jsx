import React from 'react';

const WorksPage = () => {
  return (
    <div className="w-full h-full p-8 pt-20 text-[#EAEAEA] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
          Our
          <span className="block text-[#EAEAEA]">
            Services
          </span>
        </h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 border border-[#3C3C3C] bg-[#2B2B2B] rounded-lg hover:border-[#5227FF] transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#5227FF]">Film Production</h3>
            <p className="text-[#A0A0A0]">Complete film production services from concept to screen</p>
          </div>
          <div className="text-center p-6 border border-[#3C3C3C] bg-[#2B2B2B] rounded-lg hover:border-[#FF9FFC] transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#FF9FFC]">Post-Production</h3>
            <p className="text-[#A0A0A0]">Professional editing, VFX, and sound design</p>
          </div>
          <div className="text-center p-6 border border-[#3C3C3C] bg-[#2B2B2B] rounded-lg hover:border-[#B19EEF] transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#B19EEF]">Creative Direction</h3>
            <p className="text-[#A0A0A0]">Conceptual development and artistic vision</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;