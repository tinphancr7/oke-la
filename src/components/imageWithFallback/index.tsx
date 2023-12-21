import { LOGO_DEFAULT } from "@/constant";
import { DetailedHTMLProps, ImgHTMLAttributes, useState } from "react";

const ImageWithFallback = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  const [imageError, setImageError] = useState<boolean>(false);
  return (
    <img
      {...props}
      src={imageError || !props.src ? LOGO_DEFAULT : props.src}
      alt={props.alt}
      onError={() => {
        setImageError(true);
      }}
    />
  );
};

export default ImageWithFallback;
