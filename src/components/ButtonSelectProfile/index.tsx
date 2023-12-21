const ButtonSelectProfile = ({
  label,
  onClick,
  isSelect,
  key,
  className,
}: {
  label: string;
  onClick: () => void;
  isSelect: boolean;
  key?: any;
  className?: string;
}) => {
  return (
    <button
      key={key}
      onClick={onClick}
      className={`${className} text-base cursor-pointer transition py-2 px-4 justify-start items-start gap-2.5 inline-flex ${
        isSelect
          ? "bg-opacity-10 rounded-md bg-yellow-700 text-yellow-700 text-base font-bold"
          : "rounded-md border border-neutral-200 "
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonSelectProfile;
