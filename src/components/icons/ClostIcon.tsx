import React from "react";

function CloseIcon({
  color = "black",
  size = 33,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
    >
      <path
        d="M25 7.93799L7 25.938"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25 25.938L7 7.93799"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
