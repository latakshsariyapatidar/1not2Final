import React from 'react';
import { Link } from 'react-router-dom';

const TeamsPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-[#EAEAEA] relative overflow-hidden">
      {/* Background network pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Connection lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${50 + Math.random() * 100}px`,
              height: '2px',
              background: `linear-gradient(90deg, ${
                i % 3 === 0 
                  ? '#5227FF' 
                  : i % 3 === 1 
                  ? '#FF9FFC' 
                  : '#B19EEF'
              }, transparent)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Team member avatars placeholder */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`avatar-${i}`}
            className="absolute w-8 h-8 rounded-full border-2 opacity-20"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              borderColor: i % 3 === 0 
                ? '#5227FF' 
                : i % 3 === 1 
                ? '#FF9FFC' 
                : '#B19EEF',
              background: `radial-gradient(circle, ${
                i % 3 === 0 
                  ? 'rgba(82, 39, 255, 0.1)' 
                  : i % 3 === 1 
                  ? 'rgba(255, 159, 252, 0.1)' 
                  : 'rgba(177, 158, 239, 0.1)'
              }, transparent)`,
              animation: `float ${4 + Math.random() * 3}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto px-8 z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent">
            Meet Our
          </h1>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-[#B19EEF] via-[#5227FF] to-[#FF9FFC] bg-clip-text text-transparent">
            Team
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          Team profiles are currently under development
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're preparing detailed profiles of our amazing team members. Soon you'll get to know the creative minds behind our incredible productions!
        </p>

        {/* Team preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { role: 'Creative Director', specialty: 'Vision & Strategy' },
            { role: 'Production Lead', specialty: 'Project Management' },
            { role: 'Technical Expert', specialty: 'Post-Production' }
          ].map((member, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${
                    i === 0 
                      ? '#5227FF, #FF9FFC' 
                      : i === 1 
                      ? '#FF9FFC, #B19EEF' 
                      : '#B19EEF, #5227FF'
                  })`,
                }}
              >
                ?
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{member.role}</h3>
              <p className="text-sm text-gray-400">{member.specialty}</p>
            </div>
          ))}
        </div>

        {/* Coming soon indicator */}
        <div className="flex justify-center items-center space-x-3 mb-12">
          <div className="text-sm text-gray-500">Profiles coming soon</div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #5227FF, #FF9FFC)',
                animation: `bounce 1.5s infinite ease-in-out`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Back to home button */}
        <Link 
          to="/" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#5227FF]/25 transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-10px) scale(1.05); 
            opacity: 0.4; 
          }
        }
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: scaleX(1); 
          }
          50% { 
            opacity: 0.3; 
            transform: scaleX(1.1); 
          }
        }
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-8px); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
};

export default TeamsPage;