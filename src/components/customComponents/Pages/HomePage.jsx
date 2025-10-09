import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TextPressure from "../../outSourcedComponents/TextPressure";

// Loading fallback component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5227FF]"></div>
    </div>
  );
}

const HomePage = () => {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    // Show promo after 1 second delay every time user lands on home page
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPromo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPromo]);

  const handleClosePromo = () => {
    setShowPromo(false);
  };

  return (
    <div className="w-full min-h-screen text-[#EAEAEA] relative">
      {/* Section 1: Hero Landing */}
      <section className="w-full h-screen relative z-10">
        {/* Content */}
        <div className="relative flex flex-col justify-center items-center h-full px-8 z-20">
          <div className="w-full max-w-4xl text-center p-10">
            <div className="mb-8">
              <TextPressure
                text="1 NOT 2"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#fff"
                strokeColor="#ff0000"
                baseFontSize={80}
                minFontSize={40}
                maxFontSize={120}
                responsiveMultiplier={1.2}
                breakpoints={{
                  sm: 0.6,
                  md: 0.8,
                  lg: 1.0,
                  xl: 1.3,
                }}
              />
            </div>

            <div className="mb-8">
              <TextPressure
                text="PRODUCTIONS"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#fff"
                strokeColor="#ff0000"
                baseFontSize={60}
                minFontSize={30}
                maxFontSize={90}
                responsiveMultiplier={1.0}
                breakpoints={{
                  sm: 0.5,
                  md: 0.7,
                  lg: 0.9,
                  xl: 1.1,
                }}
              />
            </div>

            <div className="w-32 h-0.5 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] mx-auto mb-8 opacity-60" />

            <div className="mb-8">
              <TextPressure
                text="Making Every Story - The Story"
                flex={true}
                alpha={true}
                stroke={false}
                width={true}
                weight={false}
                italic={true}
                textColor="#A0A0A0"
                strokeColor="#ff0000"
                baseFontSize={24}
                minFontSize={16}
                maxFontSize={32}
                responsiveMultiplier={1.0}
                breakpoints={{
                  sm: 0.7,
                  md: 0.8,
                  lg: 1.0,
                  xl: 1.2,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Movie Popup */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            style={{ zIndex: 9999 }}
            onClick={handleClosePromo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full my-auto bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              {/* Close Button */}

              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Movie Poster */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden">
                  <img
                    src="/UpcomingWork/kadidarkadi.jpg"
                    alt="Upcoming Movie"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-gray-900/80 md:to-gray-900/90" />

                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                      Coming this Diwali
                    </div>
                  </div>
                </div>

                {/* Right Side - Movie Details */}
                <div className="p-5 sm:p-8 md:p-12 flex flex-col justify-center">
                  {/* Eyebrow */}
                  <div className="text-purple-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4">
                    New Production Announcement
                  </div>

                  {/* Movie Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                    Kadi Dark Kadi
                  </h2>

                  {/* Tagline */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 italic">
                    "Where shadows dance and secrets unfold..."
                  </p>

                  {/* Movie Info */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      This Diwali
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Thriller / Drama
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="px-2 sm:px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                      In Production
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                   In the heart of the city’s dark underworld, love turns to betrayal and loyalty to chaos. KADI DAR KADI follows two men entangled in a deadly web spun by crime, passion, and deceit — where survival is the only truth.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      to="/works"
                      onClick={handleClosePromo}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-sm sm:text-base uppercase tracking-wider hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center"
                    >
                      View All Projects
                    </Link>
                    <button
                      onClick={handleClosePromo}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-sm sm:text-base uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
                    >
                      Maybe Later
                    </button>
                  </div>

                  {/* Social Proof */}
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-gray-900" />
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 border-2 border-gray-900" />
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-gray-900" />
                        </div>
                        <span className="text-gray-400">
                          +1000 interested viewers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
