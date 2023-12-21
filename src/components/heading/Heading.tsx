import React from "react";
import { twMerge } from "tailwind-merge";
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}
const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h3
      className={twMerge(
        `text-lg lg:text-2xl font-bold text-[#111] pb-4`,
        className
      )}
    >
      {children}
    </h3>
  );
};

export default Heading;
