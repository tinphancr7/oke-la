import { axiosInstanceNonAuth } from ".";

export const getSeoByLink = (link: string) =>
  axiosInstanceNonAuth.get(`/seo/get-seo-by-link?link=${link}`);
