import { LOGO_DEFAULT } from "@/constant";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
const CardOkChoi = ({
  onKeyUp,
  children,
}: {
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-lg px-6 py-10 z-50 max-w-sm"
      onKeyUp={onKeyUp}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-20 h-20 relative">
          <Image
            src="/images/logo-banhgio.webp"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CardOkChoi;
