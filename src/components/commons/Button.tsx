"use client";

import React from "react";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ButtonProps {
  text: string;
  icon?: FontAwesomeIconProps["icon"];
  iconSize?: "sm" | "lg" | "xl" | "2xl" | "4xl";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
  textSize?: string;
  href?: string;
  clipPath?: {
    outer?: string;
    inner?: string;
  };
  minWidth?: string;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  helper?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconSize = "lg",
  bgColor = "#FF7028",
  textColor = "#FFFFFF",
  borderColor = "#DDDDDD",
  height = "48px",
  onClick,
  className = "",
  textSize,
  href,
  clipPath = {
    outer: "polygon(8% 0%, 92% 0%, 100% 14%, 100% 86%, 92% 100%, 8% 100%, 0% 86%, 0% 14%)",
    inner: "polygon(9% 1%, 91.8% 1%, 99% 14%, 99% 86%, 91.8% 99%, 9% 99%, 1% 86%, 1% 14%)"
  },
  minWidth,
  maxWidth,
  padding = "px-4",
  margin,
  helper: _helper,
  width = "auto",
}) => {
  const baseClasses =
    "relative flex items-center justify-center uppercase tracking-wide shadow-md transition duration-300 hover:opacity-80";
  const buttonClasses = `${baseClasses} ${className}`;

  const buttonContent = (
    <>
      <button
        onClick={onClick}
        className={buttonClasses}
        style={{
          position: "relative",
          color: textColor,
          height,
          width,
          clipPath: clipPath.outer,
          minWidth: minWidth ?? "auto",
          maxWidth: maxWidth ?? "none",
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            backgroundColor: borderColor,
            height,
          }}
        ></span>

        <span
          className={`bg-white relative flex items-center justify-center gap-2 ${padding} font-titillium font-light w-full`}
          style={{
            backgroundColor: bgColor,
            clipPath: clipPath.inner,
            height: `calc(${height} - 2px)`,
            minWidth: minWidth ? `calc(${minWidth} - 2px)` : "auto",
            maxWidth: maxWidth ? `calc(${maxWidth} - 4px)` : "none",
            margin: margin,
          }}
        >
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={`text-${iconSize} text-white`}
            />
          )}
          {text ? (
            <span className={`text-${textSize} text-white whitespace-normal text-center`}>{text}</span>
          ) : null}
        </span>
      </button>
    </>
  );

  return href ? (
    <Link href={href}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default Button;
