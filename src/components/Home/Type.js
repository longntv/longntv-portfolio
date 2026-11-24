import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Senior Back-end Engineer & Technical Lead",
          "Security-first AI-Driven Development (ADLC)",
          "Golang Micro-services on AWS",
          "Industrial IoT: Device to Dashboard",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
