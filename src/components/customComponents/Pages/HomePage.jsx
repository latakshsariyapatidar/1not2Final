import React, { Suspense} from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="w-full min-h-screen text-[#EAEAEA] relative">


      {/* Section 1: Hero Landing */}
      <section
        className="w-full h-screen relative z-10"

      >


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
    </div>
  );
};

export default HomePage;
