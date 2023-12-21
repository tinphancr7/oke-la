import { MouseEventHandler } from "react";

export const ButtonTabPane = ({
  label,
  isActive,
  onClick,
  key,
}: {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  key: any;
}) => {
  return (
    <div>
      <button
        className={` px-4 py-3  rounded-lg justify-center items-center gap-2.5 inline-flex whitespace-nowrap ${
          isActive ? "bg-orange-100 " : "border border-neutral-200"
        }`}
        onClick={onClick}
      >
        <span
          className={`text-sm ${
            isActive
              ? "text-yellow-700 font-bold"
              : "text-zinc-400 font-semibold"
          }`}
        >
          {" "}
          {label}
        </span>
      </button>
    </div>
  );
};
