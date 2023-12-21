import React, { CSSProperties } from "react";

type Props = {
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function ButtonOnlyIcon({
  wrapperStyle = {},
  wrapperClassName = "",
  children,
  onClick = () => null,
  ...prop
}: Props) {
  const style = {
    ...wrapperStyle,
  };

  return (
    <button
      {...prop}
      onClick={onClick}
      style={style}
      className={wrapperClassName}
    >
      {children}
    </button>
  );
}

export default ButtonOnlyIcon;
