import React from "react";
import LiquidEther from "../../outSourcedComponents/LiquidEther";

function Background() {
  return (
    <div className="h-[100dvh] w-full absolute backdrop-blur-2xl blur-3xl">
      <LiquidEther
        colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
        mouseForce={50}
        cursorSize={100}
        isViscous={true}
        viscous={100}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.3}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={1.5}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.2}
      />
    </div>
  );
}

export default Background;
