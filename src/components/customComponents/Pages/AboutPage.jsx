import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-[#EAEAEA] relative overflow-hidden">
      {/* Background particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
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
              animation: `float ${10 + Math.random() * 10}s infinite linear`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto px-8 z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent">
            Under
          </h1>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-[#B19EEF] via-[#FF9FFC] to-[#5227FF] bg-clip-text text-transparent">
            Development
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          This page is currently under development
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We are working our best to make it live soon. Stay tuned for something amazing!
        </p>

        {/* Animated loading dots */}
        <div className="flex justify-center space-x-2 mb-12">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #5227FF, #FF9FFC)',
                animation: `pulse 1.5s infinite ease-in-out`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Back to home button */}
        <Link 
          to="/" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#5227FF]/25 transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.5; 
          }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;