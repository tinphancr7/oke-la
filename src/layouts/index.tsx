import React from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";

type Props = {
	children: React.ReactElement;
};

function Layout({children}: Props) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default Layout;
