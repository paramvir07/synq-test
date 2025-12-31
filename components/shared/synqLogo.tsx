import React from "react";

type SynqLogoProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const SynqLogo: React.FC<SynqLogoProps> = ({
  size = 96,
  color = "#10B981",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      {/* Left wave */}
      <path
        d="M20 48c0-15 8-25 15-25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Right wave (mirrored) */}
      <path
        d="M76 48c0-15-8-25-15-25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Center play icon */}
      <path
        d="M42 34 L42 62 L62 48 Z"
        fill={color}
      />
    </svg>
  );
};