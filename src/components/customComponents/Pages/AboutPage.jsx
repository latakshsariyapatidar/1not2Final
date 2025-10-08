import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Background from "../Static/Background";
import TextPressure from "../../outSourcedComponents/TextPressure";

const AboutPage = () => {

  // Services data for our modern minimal implementation
  const services = [
    {
      id: 1,
      title: "Film & Short Film Production",
      description:
        "Complete film production from concept to final cut, bringing stories to life with cinematic excellence.",
      icon: "🎬",
    },
    {
      id: 2,
      title: "Music Videos",
      description:
        "Creative music video production that captures the essence of your sound and translates it into compelling visuals.",
      icon: "🎵",
    },
    {
      id: 3,
      title: "Commercials & Ad Films",
      description:
        "Brand storytelling through impactful commercials that connect with audiences and drive engagement.",
      icon: "📺",
    },
    {
      id: 4,
      title: "Post-Production",
      description:
        "Professional editing, color grading, and VFX services that enhance your visual content.",
      icon: "✂️",
    },
    {
      id: 5,
      title: "Creative Direction",
      description:
        "Strategic creative guidance to ensure your project maintains a cohesive and compelling vision.",
      icon: "🎯",
    },
    {
      id: 6,
      title: "Scriptwriting",
      description:
        "Crafting compelling narratives and dialogue that serve as the foundation for impactful storytelling.",
      icon: "✍️",
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {/* Hero Section */}
        <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 text-center max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Main Title with TextPressure */}
              <div className="mb-6 sm:mb-8">
                <TextPressure
                  text="MAKING"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] mb-2 sm:mb-4"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                  }}
                  pressureConfig={{
                    maxPressure: 0.6,
                    sensitivity: 1.5,
                    baseFontWeight: 300,
                    maxFontWeight: 700,
                  }}
                />
                <TextPressure
                  text="EVERY STORY"
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] mb-2 sm:mb-4"
                  style={{
                    fontFamily: "'Compressa', sans-serif",
                    background:
                      "linear-gradient(135deg, #5227FF, #FF9FFC, #B19EEF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  pressureConfig={{
                    maxPressure: 0.6,
                    sensitivity: 1.5,
                    baseFontWeight: 300,
                    maxFontWeight: 700,
                  }}
                />
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mt-4 sm:mt-6 lg:mt-8 tracking-tight font-extralight italic font-['Compressa']">
                  THE STORY
                </span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-zinc-500 font-light tracking-wide max-w-4xl mx-auto leading-relaxed px-4">
                Where passion meets precision, and every frame tells a story
                worth remembering
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Connected Sections */}
        <div className="relative ">
          {/* WHO WE ARE Section */}
          <CinematicSection id="who-we-are" className="py-16 sm:py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CinematicTitle>WHO WE ARE</CinematicTitle>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Story Text */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative order-2 lg:order-1"
                >
                  <div className="space-y-6 sm:space-y-8">
                    <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-200 font-light">
                      Born from the collision of{" "}
                      <span className="text-white font-normal">
                        timeless storytelling
                      </span>{" "}
                      and cutting-edge vision,{" "}
                      <span className="text-white font-normal">
                        1 NOT 2 Productions
                      </span>{" "}
                      emerged from a simple belief: every story deserves to be
                      told with uncompromising artistry.
                    </p>

                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                      We are passionate storytellers, visual craftsmen, and
                      dream architects who understand that behind every great
                      film lies an even greater story waiting to be discovered,
                      nurtured, and brought to life with meticulous attention to
                      detail.
                    </p>
                  </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative order-1 lg:order-2"
                >
                  <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                      src="../../../../public/color_logo.jpg"
                      alt="1not2 Productions Logo"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </CinematicSection>

          {/* WHAT WE DO - Modern Interactive Grid */}
          <CinematicSection
            id="what-we-do"
            className="py-16 sm:py-20 lg:py-32 relative"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CinematicTitle>WHAT WE DO</CinematicTitle>

              {/* Interactive Service Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
                  >
                    {/* Service Icon */}
                    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl sm:rounded-b-2xl" />

                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>

              {/* Interactive Bottom Section */}

            </div>
          </CinematicSection>

          {/* PHILOSOPHY Section */}
          <CinematicSection
            id="vision"
            className="py-20 sm:py-32 lg:py-40 relative overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden"
              >
                <div className="relative overflow-hidden px-2 sm:px-4 mb-8 sm:mb-12">
                  <TextPressure
                    text="Our Vision"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] block max-w-full"
                    style={{
                      fontFamily: "'Compressa', sans-serif",
                      background:
                        "linear-gradient(135deg, #5227FF, #FF9FFC, #B19EEF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "100%",
                    }}
                    pressureConfig={{
                      maxPressure: 0.4,
                      sensitivity: 1.5,
                      baseFontWeight: 200,
                      maxFontWeight: 500,
                    }}
                  />
                </div>
                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed text-gray-100 italic mb-8 sm:mb-12 px-4 break-words">
                  "Cinema is not just about capturing moments—
                  <br className="hidden sm:block" />
                  it's about creating{" "}
                  <span className="text-[#FF9FFC] font-normal">
                    timeless experiences
                  </span>
                  <br className="hidden sm:block" />
                  that resonate long after the credits roll."
                </blockquote>

                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
                  We believe in the power of authentic storytelling, where every
                  frame is deliberate, every edit purposeful, and every story
                  told with the respect it deserves.
                </p>
              </motion.div>
            </div>
          </CinematicSection>

          {/* CALL TO ACTION */}
          <CinematicSection
            id="cta"
            className="py-20 sm:py-32 lg:py-40 relative overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden px-2 sm:px-4 mb-8 sm:mb-12">
                  <TextPressure
                    text="HAVE A STORY ?"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] block max-w-full"
                    style={{
                      fontFamily: "'Compressa', sans-serif",
                      background:
                        "linear-gradient(135deg, #5227FF, #FF9FFC, #B19EEF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "100%",
                    }}
                    pressureConfig={{
                      maxPressure: 0.2,
                      sensitivity: 1.5,
                      baseFontWeight: 200,
                      maxFontWeight: 500,
                    }}
                  />
                </div>

                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-200 mb-12 sm:mb-16 font-light tracking-wide px-4">
                  Let's create something unforgettable together
                </p>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-white font-medium text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl uppercase tracking-wide sm:tracking-widest overflow-hidden transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF]" />
                  <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                    Start Your Story
                    <span className="text-xl sm:text-2xl">→</span>
                  </span>
                </Link>
              </motion.div>
            </div>
          </CinematicSection>
        </div>
      </div>

      {/* Optimized CSS for Better Performance */}
      <style jsx>{`
        @font-face {
          font-family: "Compressa";
          src: url("https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2")
            format("woff2");
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
        }

        /* Custom scrollbar with cinematic theme */
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

// CINEMATIC COMPONENTS

// Enhanced Section Component
const CinematicSection = ({ children, className = "", ...props }) => {
  return (
    <motion.section
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

// Simplified Title Component
const CinematicTitle = ({ children }) => {
  return (
    <div className="text-center mb-12 sm:mb-16 lg:mb-20 relative overflow-hidden px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div className="relative max-w-full overflow-hidden">
          <TextPressure
            text={children}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.25em] block relative z-10 max-w-full"
            style={{
              fontFamily: "'Compressa', sans-serif",
              color: "white",
              wordBreak: "break-word",
              overflowWrap: "break-word",
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
    </div>
  );
};

// Optimized Service Card Component (Performance Focused)
const OptimizedServiceCard = ({ service, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      {/* Card Container */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/20">
        {/* Icon */}
        <div className="text-6xl mb-8 transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>

        {/* Service Title */}
        <h3 className="text-2xl font-medium mb-6 text-gray-100 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>

        {/* Service Description */}
        <p className="text-gray-300 leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
