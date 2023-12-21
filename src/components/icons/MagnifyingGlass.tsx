import React from "react";

type Props = {
  color?: string;
};

function MagnifyingGlass({ color = "#FFAD01" }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5299 20.4696L16.8358 15.7765C18.1963 14.1431 18.8748 12.048 18.73 9.92715C18.5852 7.80629 17.6283 5.82289 16.0584 4.38956C14.4885 2.95623 12.4264 2.18333 10.3012 2.23163C8.1759 2.27993 6.15108 3.14571 4.64791 4.64888C3.14474 6.15205 2.27895 8.17687 2.23065 10.3021C2.18235 12.4274 2.95526 14.4894 4.38859 16.0593C5.82191 17.6293 7.80531 18.5861 9.92618 18.7309C12.047 18.8757 14.1421 18.1973 15.7755 16.8368L20.4686 21.5308C20.5383 21.6005 20.621 21.6558 20.7121 21.6935C20.8031 21.7312 20.9007 21.7506 20.9992 21.7506C21.0978 21.7506 21.1954 21.7312 21.2864 21.6935C21.3775 21.6558 21.4602 21.6005 21.5299 21.5308C21.5995 21.4612 21.6548 21.3784 21.6925 21.2874C21.7302 21.1963 21.7497 21.0988 21.7497 21.0002C21.7497 20.9017 21.7302 20.8041 21.6925 20.713C21.6548 20.622 21.5995 20.5393 21.5299 20.4696ZM3.74924 10.5002C3.74924 9.16519 4.14512 7.86015 4.88682 6.75011C5.62852 5.64008 6.68272 4.77492 7.91612 4.26403C9.14953 3.75314 10.5067 3.61946 11.8161 3.87991C13.1255 4.14036 14.3282 4.78324 15.2722 5.72724C16.2162 6.67125 16.8591 7.87398 17.1195 9.18335C17.38 10.4927 17.2463 11.8499 16.7354 13.0833C16.2245 14.3167 15.3594 15.3709 14.2493 16.1126C13.1393 16.8543 11.8343 17.2502 10.4992 17.2502C8.70964 17.2482 6.9939 16.5364 5.72846 15.271C4.46302 14.0056 3.75122 12.2898 3.74924 10.5002Z"
        fill="#A95E01"
      />
    </svg>
  );
}

export default MagnifyingGlass;
