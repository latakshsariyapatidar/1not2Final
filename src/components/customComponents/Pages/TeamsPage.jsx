import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ChromaGrid from "../../outSourcedComponents/ChromaGrid";
import Background from "../Static/Background";
import TextPressure from "../../outSourcedComponents/TextPressure";

const TeamsPage = () => {
  // Team members data - production team
  const teamMembers = [
    {
      image: "public/TeamMembers/Lataksh.jpg",
      title: "Lataksh Sariya",
      subtitle: "Technical Lead (Web)",
      handle: "@lataksh_sariya",
      borderColor: "#5227FF",
      gradient: "linear-gradient(145deg, #5227FF, #000)",
      location: "Indore",
      url: "https://github.com/latakshsariyapatidar",
      bio: "Building and running our digital home."
    },
    
  ];


  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        fontFamily: "Compressa",
      }}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Background />
        {/* Cinematic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative z-30 text-center max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Main Title with TextPressure */}
              <div className="mb-8 sm:mb-12 overflow-hidden px-2">
                <TextPressure
                  text="MEET THE"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-[0.15em] mb-4"
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
                  text="CREATORS"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-[0.15em]"
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
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto mb-12 sm:mb-16 px-4"
              >
                A collective of passionate storytellers, visual artists, and technical wizards
                <br className="hidden sm:block" />
                united by one vision: to create cinematic magic
              </motion.p>



              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-sm text-gray-400 uppercase tracking-widest">Meet Our Team</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl text-purple-400"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section with ChromaGrid */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 sm:mb-20 overflow-hidden"
            >
              <div className="relative overflow-hidden px-2">
                <TextPressure
                  text="OUR TEAM"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light uppercase tracking-[0.2em] block max-w-full"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                    color: "white",
                    maxWidth: "100%",
                  }}
                  pressureConfig={{
                    maxPressure: 0.4,
                    sensitivity: 1.2,
                    baseFontWeight: 200,
                    maxFontWeight: 500,
                  }}
                />
              </div>

            </motion.div>

            {/* ChromaGrid Team Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative bg-transparent"
              style={{ minHeight: "800px" }}
            >
              <ChromaGrid
                items={teamMembers}
                radius={350}
                damping={0.4}
                fadeOut={0.7}
                ease="power3.out"
                className="py-8"
              />
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 leading-tight">
                Want to work with us?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 sm:mb-12 font-light leading-relaxed px-4">
                We're always looking for talented individuals who share our passion
                <br className="hidden sm:block" />
                for storytelling and cinematic excellence
              </p>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-medium uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                Get In Touch
                <span className="text-xl sm:text-2xl">→</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </div>

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

export default TeamsPage;
