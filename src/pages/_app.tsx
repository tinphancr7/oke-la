import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.scss";
import "react-datetime/css/react-datetime.css";
import {ReactNode} from "react";
// @ts-ignore
import {AppLayoutProps} from "next/app";
import {Provider} from "react-redux";
import AuthProvider from "@/context/AuthContext";
import SocketProvider from "@/context/SocketContext";
import {store} from "@/redux";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "@/layouts/Auth";
import Providers from "@/utils/provider";

export default function App({Component, pageProps}: AppLayoutProps) {
	const renderWithLayout =
		Component.getLayout ||
		function (page: ReactNode) {
			return (
				<MainLayout>
					{page}
					<ToastContainer
						hideProgressBar
						closeOnClick={false}
						closeButton={false}
					/>
					{/* <Auth /> */}
				</MainLayout>
			);
		};

	return (
		<Provider store={store}>
			<AuthProvider>
				<SocketProvider>
					<Providers>
						{renderWithLayout(<Component {...pageProps} />)}
					</Providers>
				</SocketProvider>
			</AuthProvider>
		</Provider>
	);
}
