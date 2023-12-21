import React from "react";

type Props = {
  color?: string;
};

function UserIcon({ color = "#FEAD00" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.1596 11.5302C12.0596 11.5202 11.9396 11.5202 11.8296 11.5302C9.44957 11.4502 7.55957 9.50016 7.55957 7.10016C7.55957 4.65016 9.53957 2.66016 11.9996 2.66016C14.4496 2.66016 16.4396 4.65016 16.4396 7.10016C16.4296 9.50016 14.5396 11.4502 12.1596 11.5302Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.15973 15.2202C4.73973 16.8402 4.73973 19.4802 7.15973 21.0902C9.90973 22.9302 14.4197 22.9302 17.1697 21.0902C19.5897 19.4702 19.5897 16.8302 17.1697 15.2202C14.4297 13.3902 9.91973 13.3902 7.15973 15.2202Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default UserIcon;
