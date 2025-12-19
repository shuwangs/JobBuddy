import React from 'react';

const defaultColor = "#2563eb";

const Logo = ({ className = "", color = defaultColor }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        d="M18 46C18 54 28 54 28 46V18H42C52 18 52 34 42 34H28V46C28 56 44 56 44 46"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round" 好
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;