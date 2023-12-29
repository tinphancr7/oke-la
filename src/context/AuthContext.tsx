import {getFavouriteLeagueByUser, login, register} from "@/apis/user";
import {IAuthContext, ILeague, IUser} from "@/interfaces";
import {
	checkExpireToken,
	expiredSession,
	getTokenFromLocastorage,
	saveTokenToLocalStorage,
} from "@/utils";
import {setCookie} from "cookies-next";
import {useRouter} from "next/router";
import React, {createContext, useEffect, useState} from "react";

type Props = {
	children: React.ReactNode;
};

// @ts-ignore
export const AuthContext = createContext<IAuthContext>();

const AuthProvider = ({children}: Props) => {
	const [user, setUser] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [isOpen, setIsOpen] = useState<any>(false);
	const [isLogin, setIsLogin] = useState<any>(true);
	const [favouriteLeagues, setFavouriteLeagues] = useState<ILeague[]>([]);

	const handleToggleModal = (status: boolean) => {
		setIsOpen(status);
	};

	const uploadAvatar = (fileName: string) => {
		try {
			setUser({
				...user,
				avatar: fileName,
			});
			localStorage.setItem(
				"authUser",
				JSON.stringify({
					...user,
					avatar: fileName,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const authUser = async (username: string, password: string) => {
		try {
			setError(false);
			const dataLogin = {
				username,
				password,
			};
			const res = await login(dataLogin);
			if (res?.data?.status === 1) {
				saveTokenToLocalStorage(res?.data?.result?.accessToken);
				setCookie("refreshToken", res?.data?.result?.refreshToken);
				localStorage.setItem(
					"authUser",
					JSON.stringify(res?.data?.result?.returnUser)
				);
				getFavouriteLeagues(res?.data?.result?.returnUser?._id);
				setUser(res?.data?.result?.returnUser);
				return {success: true};
			}
		} catch (error: any) {
			if (error?.response?.data?.statusCode === 401) {
				setError(error?.response?.data?.message);
				return {success: false, message: error?.response?.data?.message};
			}
		}
	};

	const registerUser = async (
		name: string,
		username: string,
		email: string,
		password: string
	) => {
		try {
			setError(false);
			const dataRegister = {
				full_name: name,
				username,
				password,
				email,
			};
			const res = await register(dataRegister);
			if (res?.data?.status === 1) {
				saveTokenToLocalStorage(res?.data?.result?.accessToken);
				setCookie(
					"refreshToken",
					JSON.stringify(res?.data?.result?.refreshToken)
				);
				localStorage.setItem(
					"authUser",
					JSON.stringify(res?.data?.result?.returnUser)
				);
				setUser(res?.data?.result?.returnUser);
			}
			return {success: true};
		} catch (error: any) {
			if (error?.response?.data?.statusCode === 400) {
				setError(error?.response?.data?.message);
				return {success: false, message: error?.response?.data?.message};
			}
		}
	};

	const logOutUser = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("authUser");
		setUser(null);
		setIsOpen(false);
		setFavouriteLeagues([]);
	};

	const updateAuthUser = (user: IUser) => {
		localStorage.setItem("authUser", JSON.stringify(user));
		setUser(user);
	};

	const provider: IAuthContext = {
		user,
		setUser,
		authUser,
		registerUser,
		error,
		setError,
		isOpen,
		setIsOpen: handleToggleModal,
		logOutUser,
		isLogin,
		setIsLogin,
		updateAuthUser,
		uploadAvatar,
		favouriteLeagues,
	};

	const getFavouriteLeagues = async (userId: string) => {
		try {
			const result = await getFavouriteLeagueByUser(userId);

			setFavouriteLeagues(result?.data?.result || []);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const token = getTokenFromLocastorage();
		const checkToken = checkExpireToken(token);

		if (checkToken && localStorage.getItem("authUser")) {
			setUser(JSON.parse(localStorage.getItem("authUser") as string));

			getFavouriteLeagues(
				JSON.parse(localStorage.getItem("authUser") as string)?._id
			);
		} else {
			expiredSession();
		}
	}, []);
	return (
		<AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
