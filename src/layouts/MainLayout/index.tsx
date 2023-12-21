import {ReactNode, Suspense, useEffect, useState} from "react";
import Header from "../Header";
import Footer from "../Footer/Footer";
import {useRouter} from "next/router";
import PreLoader from "@/components/loading/PreLoader";

const MainLayout = ({children}: {children: ReactNode}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => {
			setLoading(true);
		};
		const handleComplete = () => {
			setLoading(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, []);

	return (
		<>
			{loading && <PreLoader />}
			<Header />

			<div className="pt-[130px] lg:pt-20">{children}</div>
			<Footer />
		</>
	);
};

export default MainLayout;
