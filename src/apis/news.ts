import { axiosInstanceAuth, axiosInstanceNonAuth } from ".";

export const getPagingNews = (pageIndex: number, pageSize: number) =>
    axiosInstanceNonAuth.get(
        `/news/getPaging?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );

export const getNewBySlug = (slug: string) =>
    axiosInstanceNonAuth.get(
        `/news/${slug}`
    );


