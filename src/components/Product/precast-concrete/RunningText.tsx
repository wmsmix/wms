import React, { useEffect, useRef } from "react";

interface RunningTextProps {
  text: string;
  speed?: number;
  backgroundColor?: string;
  textColor?: string;
  clipAngle?: number;
}

const RunningText: React.FC<RunningTextProps> = ({
  text,
  speed = 120, // Much slower animation (120 seconds for complete cycle)
  backgroundColor,
  textColor = "white",
  clipAngle = 12,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply animation directly to the element
    if (marqueeRef.current) {
      marqueeRef.current.style.animation = `marquee ${speed}s linear infinite`;
    }
  }, [speed]);

  // Define the keyframes style
  useEffect(() => {
    // Check if the keyframes style already exists
    if (!document.getElementById('marquee-keyframes')) {
      const keyframesStyle = document.createElement('style');
      keyframesStyle.id = 'marquee-keyframes';
      keyframesStyle.innerHTML = `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `;
      document.head.appendChild(keyframesStyle);

      // Clean up on unmount
      return () => {
        const styleElement = document.getElementById('marquee-keyframes');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, []);

  return (
    <div 
      className={`w-full py-4 overflow-hidden ${backgroundColor} relative`} 
      style={{ 
        backgroundColor,
        clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${clipAngle}px), calc(100% - ${clipAngle}px) 100%, ${clipAngle}px 100%, 0 calc(100% - ${clipAngle}px))`
      }}
    >
      <div 
        ref={marqueeRef}
        className={`whitespace-nowrap ${textColor}`}
        style={{
          display: 'inline-block',
          willChange: 'transform',
        }}
      >
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
      </div>
    </div>
  );
};

export default RunningText; 