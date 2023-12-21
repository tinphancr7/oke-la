import { axiosInstanceNonAuth } from ".";

export const getBannerHome = () => axiosInstanceNonAuth.get(`/banner`);
