import React from "react";

const Logo = ({ className = "", width = "40", height = "40" }) => {
  const gradientId = "jobBuddyGrowthGradient";

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="10"
          y1="54"
          x2="54"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <path
        d="M16 48C16 48 18 34 28 26C38 18 54 12 54 12L42 26C50 24 56 30 56 38C56 46 48 50 40 50C32 50 26 44 26 44L16 48Z"
        fill={`url(#${gradientId})`}
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
