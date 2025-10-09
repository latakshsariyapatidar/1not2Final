import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Background from "../Static/Background";
import TextPressure from "../../outSourcedComponents/TextPressure";

const WorksPage = () => {
  const [activeTab, setActiveTab] = useState('released');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Released Movies Data
  const releasedMovies = [
    {
      id: 1,
      title: "Burden of Masks",
      image: "/ReleasedWork/burdenofmasks.webp",
      youtubeLink: "https://www.youtube.com/watch?v=yAm4uxLgKIc",
      year: "2024",
      genre: "Drama",
      duration: "25 min",
      description: "A powerful exploration of identity and societal pressures."
    },
    {
      id: 2,
      title: "Chahat",
      image: "/ReleasedWork/chahat.webp",
      youtubeLink: "https://www.youtube.com/watch?v=1H6TkqfACMg",
      year: "2024",
      genre: "Romance",
      duration: "18 min",
      description: "A heartwarming tale of love transcending boundaries."
    },
  ];

  // Upcoming Movies Data
  const upcomingMovies = [
    {
      id: 4,
      title: "Residuum",
      image: "/UpcomingWork/residuum.webp", // Placeholder
      youtubeLink: "#",
      year: "2025",
      genre: "Thriller",
      duration: "TBA",
      description: "A gripping psychological thriller that keeps you on edge.",
      status: "In Production"
    },
  ];

  const currentMovies = activeTab === 'released' ? releasedMovies : upcomingMovies;

  const handleMovieClick = (movie) => {
    if (movie.youtubeLink && movie.youtubeLink !== '#') {
      window.open(movie.youtubeLink, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden overflow-y-auto"
      style={{
        fontFamily: "Compressa",
      }}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Background />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-12"
        >
          <div className="relative z-30 text-center max-w-7xl mx-auto w-full">
            <div>
              {/* Main Title with TextPressure */}
              <div className="mb-8 sm:mb-12 overflow-hidden px-2">
                <TextPressure
                  text="OUR"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.15em] mb-4"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                    color: "white",
                    maxWidth: "100%",
                  }}
                  pressureConfig={{
                    maxPressure: 0.5,
                    sensitivity: 1.5,
                    baseFontWeight: 300,
                    maxFontWeight: 600,
                  }}
                />
                <TextPressure
                  text="CINEMATIC"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.15em] mb-4"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                    background: "linear-gradient(135deg, #5227FF, #FF9FFC, #B19EEF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    maxWidth: "100%",
                  }}
                  pressureConfig={{
                    maxPressure: 0.5,
                    sensitivity: 1.5,
                    baseFontWeight: 300,
                    maxFontWeight: 600,
                  }}
                />
                <TextPressure
                  text="PORTFOLIO"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                    color: "white",
                    maxWidth: "100%",
                  }}
                  pressureConfig={{
                    maxPressure: 0.5,
                    sensitivity: 1.5,
                    baseFontWeight: 300,
                    maxFontWeight: 600,
                  }}
                />
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto px-4">
                Stories that resonate, frames that captivate
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className="flex justify-center gap-4 sm:gap-6 mb-12"
            >
              <button
                onClick={() => setActiveTab('released')}
                className={`relative px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  activeTab === 'released'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                Released Works
              </button>

              <button
                onClick={() => setActiveTab('upcoming')}
                className={`relative px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>
        </section>

        {/* Movies Grid */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {currentMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    {/* Movie Poster */}
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        >
                          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Status Badge for Upcoming */}
                      {movie.status && (
                        <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                          {movie.status}
                        </div>
                      )}
                    </div>

                    {/* Movie Info */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {movie.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.genre}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                      </div>

                      <p className="text-sm text-gray-300 line-clamp-2">
                        {movie.description}
                      </p>

                      {/* Watch Now Button */}
                      {movie.youtubeLink !== '#' && (
                        <div
                          className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold"
                        >
                          Watch Now
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {currentMovies.length === 0 && (
              <div
                className="text-center py-20"
              >
                <p className="text-2xl text-gray-400">No projects to display yet</p>
              </div>
            )}
          </div>
        </section>


      </div>

      {/* Movie Detail Modal (for upcoming movies without links) */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedMovie(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full"
            >
              <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
              <p className="text-gray-300 mb-6">{selectedMovie.description}</p>
              <div className="flex items-center gap-4 text-gray-400 mb-6">
                <span>{selectedMovie.year}</span>
                <span>•</span>
                <span>{selectedMovie.genre}</span>
                {selectedMovie.status && (
                  <>
                    <span>•</span>
                    <span className="text-purple-400">{selectedMovie.status}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx>{`
        @font-face {
          font-family: "Compressa";
          src: url("https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2")
            format("woff2");
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #5227ff, #ff9ffc);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #ff9ffc, #5227ff);
        }
      `}</style>
    </div>
  );
};

export default WorksPage;