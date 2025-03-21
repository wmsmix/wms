import React from "react";

interface RunningTextProps {
  text: string;
  speed?: number;
  backgroundColor?: string;
  textColor?: string;
  clipAngle?: number;
}

const RunningText: React.FC<RunningTextProps> = ({
  text,
  speed = 30,
  backgroundColor,
  textColor = "white",
  clipAngle = 12,
}) => {
  return (
    <div 
      className={`w-full py-4 overflow-hidden ${backgroundColor} relative`} 
      style={{ 
        backgroundColor,
        clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${clipAngle}px), calc(100% - ${clipAngle}px) 100%, ${clipAngle}px 100%, 0 calc(100% - ${clipAngle}px))`
      }}
    >
      <div 
        className={`whitespace-nowrap animate-marquee ${textColor}`}
      >
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
        <span className="inline-block mx-4 text-sm font-medium">{text}</span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          display: inline-block;
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RunningText; 