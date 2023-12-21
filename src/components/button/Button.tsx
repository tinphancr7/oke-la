"use client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: any;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}
const Button: React.FC<ButtonProps> = ({
  className,
  icon: Icon,
  href,
  children,
  type = "button",
  onClick,
}) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`flex items-center justify-center gap-2 ${className}`}
        >
          {Icon && <Icon size={20} />}
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={twMerge(
            `rounded-lg flex items-center justify-center gap-1 text-base  ${className}`
          )}
          onClick={onClick}
        >
          {children}
          {Icon && <Icon size={20} />}
        </button>
      )}
    </>
  );
};

export default Button;
