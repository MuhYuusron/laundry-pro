import React from "react";

const bubbles = [
  { size: 220, left: "5%", top: "10%", color: "rgba(66, 153, 225, 0.08)", delay: "0s" },
  { size: 140, left: "20%", top: "65%", color: "rgba(14, 165, 233, 0.06)", delay: "1s" },
  { size: 320, left: "75%", top: "5%", color: "rgba(59, 130, 246, 0.06)", delay: "0.6s" },
  { size: 180, left: "80%", top: "60%", color: "rgba(250, 204, 21, 0.06)", delay: "1.4s" },
  { size: 100, left: "45%", top: "30%", color: "rgba(14, 165, 233, 0.05)", delay: "0.3s" },
  { size: 260, left: "-5%", top: "72%", color: "rgba(99, 102, 241, 0.05)", delay: "2s" },
];

export default function BubbleBackground() {
  return (
    <div aria-hidden className="bubble-bg">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, transparent 40%)`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
