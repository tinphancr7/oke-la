import {getSeoByLink} from "@/apis/seo";
import Breadcrumb from "@/components/Breadcrumb";
import {GetServerSidePropsContext} from "next";
import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import RankTable from "@/components/rankTable";
import LeagueOtherHome from "@/containers/Home/LeagueOtherHome";

const Transcript = ({tags}: {tags: string[]}) => {
	return (
		<div>
			<Head>
				{tags?.map((tag, index) => (
					<React.Fragment key={index}>{parse(tag)}</React.Fragment>
				))}
			</Head>
			<div className="xl:container mx-auto md:px-4 xl:px-2">
				<div className="mt-6">
					<Breadcrumb
						backLink="/"
						breadCrumb={[
							{title: "Trang chủ", url: "/"},
							{title: "Bảng xếp hạng", url: "/bang-tinh-diem"},
						]}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 mt-8 gap-5">
					<div className="order-2 lg:order-first col-span-1 -mt-4">
						<LeagueOtherHome />
					</div>
					<div className="col-span-1 lg:col-span-3">
						<div className="bg-grayE4 rounded-lg  shadow-xl">
							<RankTable leagueId="1639" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transcript;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const seo = await getSeoByLink("/bang-tinh-diem");

		return {
			props: {
				tags: seo?.data?.result?.tags || [],
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
}
