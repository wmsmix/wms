"use client";

import React from "react";

interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  bgColor = "#E87722",
  textColor = "#FFFFFF",
  borderColor = "#FFFFFF",
  height = "48px",
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative font-bold uppercase tracking-wide shadow-md transition duration-300 hover:opacity-80 ${className}`}
      style={{
        position: "relative",
        color: textColor,
        height,
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          backgroundColor: borderColor,
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 14%, 100% 86%, 92% 100%, 8% 100%, 0% 86%, 0% 14%)",
          height,
        }}
      ></span>

      <span
        className="relative flex items-center justify-center px-6"
        style={{
          backgroundColor: bgColor,
          clipPath:
            "polygon(9% 1%, 91.8% 1%, 99% 14%, 99% 86%, 91.8% 99%, 9% 99%, 1% 86%, 1% 14%)",
          height: `calc(${height} - 0.5px)`,
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
