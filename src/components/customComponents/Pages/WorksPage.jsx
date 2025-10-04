import React from 'react';
import { Link } from 'react-router-dom';

const WorksPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-[#EAEAEA] relative overflow-hidden">
      {/* Background particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                i % 3 === 0 
                  ? '#5227FF' 
                  : i % 3 === 1 
                  ? '#FF9FFC' 
                  : '#B19EEF'
              })`,
              animation: `drift ${15 + Math.random() * 10}s infinite linear`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto px-8 z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-[#FF9FFC] via-[#B19EEF] to-[#5227FF] bg-clip-text text-transparent">
            Portfolio
          </h1>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent">
            Coming Soon
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          Our showcase is currently under development
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're curating our best work to present an amazing portfolio. Stay tuned for incredible projects and creative excellence!
        </p>

        {/* Animated progress indicator */}
        <div className="mb-12">
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] rounded-full"
              style={{
                width: '60%',
                animation: 'progress 3s ease-in-out infinite alternate'
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">60% Complete</p>
        </div>

        {/* Back to home button */}
        <Link 
          to="/" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF9FFC] to-[#B19EEF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FF9FFC]/25 transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes drift {
          0% { 
            transform: translateX(-10px) translateY(0px) rotate(0deg); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateX(10px) translateY(-15px) rotate(180deg); 
            opacity: 0.3; 
          }
          100% { 
            transform: translateX(-10px) translateY(0px) rotate(360deg); 
            opacity: 0.1; 
          }
        }
        @keyframes progress {
          0% { width: 40%; }
          100% { width: 80%; }
        }
      `}</style>
    </div>
  );
};

export default WorksPage;