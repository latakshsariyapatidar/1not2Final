import React from "react";
import DotGrid from "../../outSourcedComponents/DotGrid";

function Background() {
  return (
    <div className="w-full h-full items-center justify-center flex ">
      <DotGrid
        dotSize={10}
        gap={20}
        baseColor="#2b2b2b"
        activeColor="#00B2A9"
        proximity={150}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={0.5}
      />
    </div>
  );
}

export default Background;
