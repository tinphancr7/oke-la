import { getBannerHome } from "@/apis/banner";
import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ListBannersHome() {
  const [banners, setBanner] = useState([]);

  const getBanners = async () => {
    try {
      const result = await getBannerHome();

      setBanner(result?.data?.result?.bannerList || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);
  
  return (
    <div>
      {banners?.map((item: any, index) => (
        <div key={index} className="mb-4">
          <a href={item?.url || "/"} target="_blank">
            <img
              src={`${config.CDN_URL}/${item?.image}`}
              alt=""
              className="w-full h-auto"
            />
          </a>
        </div>
      ))}
    </div>
  );
}

export default ListBannersHome;
