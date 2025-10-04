import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-[#EAEAEA] relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(45deg, ${
                i % 3 === 0 
                  ? '#5227FF' 
                  : i % 3 === 1 
                  ? '#FF9FFC' 
                  : '#B19EEF'
              })`,
              borderRadius: i % 2 === 0 ? '50%' : '0%',
              animation: `rotate ${20 + Math.random() * 10}s infinite linear`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto px-8 z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-[#B19EEF] via-[#5227FF] to-[#FF9FFC] bg-clip-text text-transparent">
            Contact
          </h1>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-[#FF9FFC] via-[#B19EEF] to-[#5227FF] bg-clip-text text-transparent">
            Form
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          Contact functionality is under development
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're building an amazing contact experience for you. Soon you'll be able to reach out to us directly through this page!
        </p>

        {/* Temporary contact info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 mb-12 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-[#5227FF]">Reach Us Meanwhile</h3>
          <div className="space-y-3 text-left">
            <p className="text-gray-300">
              <span className="text-[#FF9FFC]">Email:</span> info@1not2.com
            </p>
            <p className="text-gray-300">
              <span className="text-[#B19EEF]">Phone:</span> Coming Soon
            </p>
            <p className="text-gray-300">
              <span className="text-[#5227FF]">Social:</span> Follow our journey
            </p>
          </div>
        </div>

        {/* Back to home button */}
        <Link 
          to="/" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#B19EEF] to-[#5227FF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#B19EEF]/25 transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes rotate {
          0% { 
            transform: rotate(0deg) scale(1); 
            opacity: 0.05; 
          }
          50% { 
            transform: rotate(180deg) scale(1.1); 
            opacity: 0.1; 
          }
          100% { 
            transform: rotate(360deg) scale(1); 
            opacity: 0.05; 
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;