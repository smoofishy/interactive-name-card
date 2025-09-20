// InteractiveCard.jsx
import React, { useRef, useState } from "react";
import "./InteractiveCard.css"; // CSS below

export default function InteractiveCard({
  width = 300,
  height = 420,
  maxAngle = 4,       // degrees max rotation
  overlaySize = 150,   // background-size percentage for overlay
  children,
}) {
  const containerRef = useRef(null);
  const [style, setStyle] = useState({
    transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
    overlayPos: "100% 50%",
    transition: "transform 120ms ease, background-position 120ms ease, filter 120ms ease",
  });

  function handleMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // mouse position relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // normalized offsets in range -1 .. 1
    const nx = (x - rect.width / 2) / (rect.width / 2);
    const ny = (y - rect.height / 2) / (rect.height / 2);

    // clamp (just in case)
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const cx = clamp(nx);
    const cy = clamp(ny);

    // compute rotations: invert X rotation because moving up should tilt away
    const rotY = cx * maxAngle;      // move left/right -> rotateY
    const rotX = -cy * maxAngle;     // move up/down -> rotateX

    // move overlay background position a bit based on mouse
    // convert normalized -1..1 to percentage 0..100
    const posX = (cx + 1) * 50; // 0..100
    const posY = (cy + 1) * 50;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`,
      overlayPos: `${posX}% ${posY}%`,
      transition: "transform 60ms linear, background-position 120ms linear, filter 120ms linear",
    });
  }

  function handleLeave() {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
      overlayPos: `100% 50%`,
      transition: "transform 400ms cubic-bezier(.2,.8,.2,1), background-position 400ms cubic-bezier(.2,.8,.2,1)",
    });
  }

  return (
    <div
      className="ia-container"
      ref={containerRef}
      style={{ width, height }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={(e) => { /* ensures transitions look smooth */ }}
    >
      <div
        className="ia-card"
        style={{
          transform: style.transform,
          transition: style.transition,
        }}
      >
        <div className="ia-content">
          {children || (
            // Example placeholder content — replace with an <img/> or whatever you want
            <div className="ia-placeholder">
              <h3>Product</h3>
              <p>Interactive card — replace with your image or markup.</p>
            </div>
          )}
        </div>
        <div
          className="ia-overlay"
          style={{
            backgroundSize: `${overlaySize}% ${overlaySize}%`,
            backgroundPosition: style.overlayPos,
            transition: style.transition,
          }}
        />
      </div>
    </div>
  );
}
