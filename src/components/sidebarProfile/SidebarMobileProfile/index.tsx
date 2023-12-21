import Link from "next/link";

interface ISidebarMenu {
  id: number;
  name: string;
  icon: (color: string) => React.ReactNode;
  link: string;
}

const SidebarMobileProfile = ({
  menu,
  setItemSelected,
  itemSelected,
}: {
  menu: ISidebarMenu[];
  setItemSelected: (id: number) => void;
  itemSelected: number;
}) => {
  return (
    <>
      <div className="inline-flex border-b mb-10 overflow-x-auto w-full gap-10 md:hidden">
        {menu?.map((item) => {
          return (
            <Link
              href={`/ho-so/${item.link}`}
              key={item?.id}
              onClick={() => setItemSelected(item?.id)}
              className={`w-full text-base whitespace-nowrap  ${
                itemSelected === item?.id
                  ? "text-secondary  border-b-2 border-secondary font-bold"
                  : "text-[#BBBBBB]"
              }`}
            >
              {item?.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SidebarMobileProfile;
