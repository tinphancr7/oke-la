import CardOkChoi from "@/components/CardOkChoi";
import {LOGO_DEFAULT} from "@/constant";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import UserIcon from "@/components/icons/User";
import Button from "@/components/button/Button";
import Facebook from "@/components/icons/Facebook";
import Gmail from "@/components/icons/Gmail";
import Twitter from "@/components/icons/Twitter";
import Lock from "@/components/icons/Lock";

import Modal from "@/components/Modal";
import React, {useEffect, useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {EnterHelper} from "@/utils";
import {FocusTrap} from "@headlessui/react";

import {MdOutlineRemoveRedEye} from "react-icons/md";
import {IoEyeOffOutline} from "react-icons/io5";
//redux

const Login = ({handleClick, onClose}: {handleClick: any; onClose?: any}) => {
	const {authUser}: any = useContext(AuthContext);
	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [error, setError] = useState<string>();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const onSubmit = async () => {
		const res = await authUser(username, password);
		if (!res?.success) {
			setError(res?.message);
		}
	};

	const handleChangeText = (
		e: React.ChangeEvent<HTMLInputElement>,
		setKey: any
	) => {
		e.preventDefault();
		if (error) {
			setError("");
		}
		if (e.target.value) {
			setKey(e.target.value);
		}
	};

	return (
		<div className="login-comp">
			<CardOkChoi onKeyUp={(e) => EnterHelper(e, onSubmit)}>
				{error && <p className="text-amber-500"> Lỗi : {error}</p>}
				<div className="pb-9">
					<p className="text-sm text-black font-semibold">Tên tài khoản</p>
					<div className="relative">
						<div className="absolute top-3 left-2">
							<UserIcon />
						</div>
						<input
							type="text"
							// value={username}
							onChange={(e) => handleChangeText(e, setUsername)}
							className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full focus-visible:ring-offset-2"
							placeholder="Nhập tên tài khoản"
						/>
					</div>
				</div>
				<div className="pb-9">
					<p className="text-sm text-black font-semibold">Mật khẩu</p>

					<div className="relative py-1">
						<div className="absolute top-4 left-2">
							<Lock />
						</div>
						<input
							type={showPassword ? "text" : "password"}
							// value={password}
							onChange={(e) => handleChangeText(e, setPassword)}
							className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full"
							placeholder="Nhập mật khẩu đăng nhập"
						/>

						<div
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-5 cursor-pointer"
						>
							{showPassword ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
						</div>
					</div>
				</div>
				<div className="flex justify-end P">
					<span className="text-amber-500 cursor-pointer hover:text-amber-600">
						Quên mật khẩu?
					</span>
				</div>
				<div className="flex justify-center py-8">
					<button
						onClick={onSubmit}
						className="h-[54px] pl-14 pr-[55px] pt-[19px] pb-4 bg-amber-500 rounded-[20px] justify-center items-center inline-flex cursor-pointer hover:bg-amber-600"
					>
						<div className="text-white text-lg font-semibold">ĐĂNG NHẬP</div>
					</button>
				</div>
				<div className="flex justify-center pb-8">
					<span className="text-black text-xs font-normal tracking-tight mr-1">
						Chưa có tài khoản?{" "}
					</span>
					<span
						className="text-amber-500 text-xs font-semibold tracking-tight hover:text-amber-600 cursor-pointer"
						onClick={handleClick}
					>
						Đăng ký ngay
					</span>
				</div>
				<div className="flex-col justify-start items-center gap-6 inline-flex w-full">
					<div className="w-[450px] relative">
						<div className="left-[170px] top-0 absolute text-neutral-200 text-xs font-normal tracking-tight">
							hoặc tiếp tục bằng
						</div>
					</div>
					<div className="justify-start items-start gap-6 inline-flex">
						<div className="cursor-pointer">
							<Facebook />
						</div>
						<div className="cursor-pointer">
							<Gmail />
						</div>
						<div className="cursor-pointer">
							<Twitter />
						</div>
					</div>
				</div>
			</CardOkChoi>
		</div>
	);
};
export default Login;
