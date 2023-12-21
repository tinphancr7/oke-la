import { IBreadcrumbProp } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const Breadcrumb = (props: IBreadcrumbProp) => {
  return (
    <div className="bread-crumb flex">
      <Link href={props.backLink}>
        <div className="bread-crumb-back bg-secondary p-1 rounded-xl pointer">
          <Image src="/icons/back.svg" width={30} height={30} alt="back-url" />
        </div>
      </Link>
      <ul className="flex ml-2 items-center bread-crumb-list">
        {props.breadCrumb.map((item, index) => (
          <li
            key={index}
            className="inline text-gray-400 text-base font-normal leading-normal last:text-secondary last:font-bold"
          >
            <Link href={item.url}>{item.title}</Link>
            <span className="mx-1 bread-crumb-next">{`>`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
