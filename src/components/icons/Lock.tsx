import React from "react";

type Props = {
  color?: string;
};

function LockIcon({ color = "#FFAD01" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M6 10.6602V8.66016C6 5.35016 7 2.66016 12 2.66016C17 2.66016 18 5.35016 18 8.66016V10.6602"
        stroke="#FEAD00"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 19.1602C13.3807 19.1602 14.5 18.0409 14.5 16.6602C14.5 15.2794 13.3807 14.1602 12 14.1602C10.6193 14.1602 9.5 15.2794 9.5 16.6602C9.5 18.0409 10.6193 19.1602 12 19.1602Z"
        stroke="#FEAD00"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 22.6602H7C3 22.6602 2 21.6602 2 17.6602V15.6602C2 11.6602 3 10.6602 7 10.6602H17C21 10.6602 22 11.6602 22 15.6602V17.6602C22 21.6602 21 22.6602 17 22.6602Z"
        stroke="#FEAD00"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default LockIcon;
