import Image from "next/image";
import React, { CSSProperties } from "react";
import ImageWithFallback from "../imageWithFallback";
import config from "@/config";

type Props = {
  size?: string;
  src: string;
  shape?: "circle" | "rectangle";
  alt?: string;
  style?: CSSProperties;
  className?: string;
};

function Avatar({
  size = "2.5rem",
  src = "",
  shape = "circle",
  alt = "",
  style = {},
  className = "",
}: Props) {
  const styles: CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    borderRadius: shape === "circle" ? "100%" : "1rem",
    objectFit: "cover",
    ...style,
  };

  return (
    <ImageWithFallback
      className={className}
      src={`${config.CDN_URL}/${src}`}
      style={styles}
      alt={alt}
    />
  );
}

export default Avatar;
