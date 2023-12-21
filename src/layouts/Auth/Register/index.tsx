import CardOkChoi from "@/components/CardOkChoi";
import UserIcon from "@/components/icons/User";
import Facebook from "@/components/icons/Facebook";
import Gmail from "@/components/icons/Gmail";
import Twitter from "@/components/icons/Twitter";
import Lock from "@/components/icons/Lock";

import {AuthContext} from "@/context/AuthContext";
import {useContext, useState} from "react";
import {EnterHelper} from "@/utils";
const Register = ({
	handleClick,
	onClose,
}: {
	handleClick: any;
	onClose?: any;
}) => {
	const {registerUser}: any = useContext(AuthContext);
	const [name, setName] = useState<string>();
	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [error, setError] = useState<string>();

	const onSubmit = async () => {
		const res = await registerUser(name, username, email, password);
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
		setKey(e.target.value);
	};

	return (
		<CardOkChoi onKeyUp={(e) => EnterHelper(e, onSubmit)}>
			{error && <p className="text-amber-500"> Lỗi : {error}</p>}
			<div className="pb-9">
				<p className="text-sm text-black font-semibold">Tên của bạn</p>
				<div className="relative">
					<div className="absolute top-3 left-2">
						<UserIcon />
					</div>
					<input
						type="text"
						value={name}
						onChange={(e) => handleChangeText(e, setName)}
						className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full"
						placeholder="Vui lòng nhập tên của bạn"
					/>
				</div>
			</div>
			<div className="pb-9">
				<p className="text-sm text-black font-semibold">Tên tài khoản</p>

				<div className="relative">
					<div className="absolute top-3 left-2">
						<UserIcon />
					</div>
					<input
						type="text"
						value={username}
						onChange={(e) => handleChangeText(e, setUsername)}
						className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full"
						placeholder="Nhập tên tài khoản"
					/>
				</div>
			</div>
			<div className="pb-9">
				<p className="text-sm text-black font-semibold">Email</p>

				<div className="relative py-1">
					<div className="absolute top-4 left-2">
						<Lock />
					</div>
					<input
						type="text"
						value={email}
						onChange={(e) => handleChangeText(e, setEmail)}
						className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full"
						placeholder="Vui lòng nhập email của bạn"
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
						type="password"
						value={password}
						onChange={(e) => handleChangeText(e, setPassword)}
						className="h-12 pl-10 pr-20 z-0 focus:outline-none align-middle rounded-xl bg-gray-100 text-xs w-full"
						placeholder="Vui lòng nhập mật khẩu của bạn"
					/>
				</div>
			</div>
			{/* <div className="flex justify-end P">
          <span className="text-amber-500 cursor-pointer hover:text-amber-600">
            Quên mật khẩu?
          </span>
        </div> */}
			<div className="flex justify-center py-8 ">
				<button
					onClick={() => onSubmit()}
					className="h-[54px] pl-14 pr-[55px] pt-[19px] pb-4 bg-amber-500 rounded-[20px] justify-center items-center inline-flex cursor-pointer hover:bg-amber-600"
				>
					<div className="text-white text-lg font-semibold">ĐĂNG KÝ</div>
				</button>
			</div>
			<div className="flex justify-center pb-8">
				<span className="text-black text-xs font-normal tracking-tight mr-1">
					Đã có tài khoản?{" "}
				</span>
				<span
					className="text-amber-500 text-xs font-semibold tracking-tight hover:text-amber-600 cursor-pointer"
					onClick={handleClick}
				>
					Đăng nhập ngay
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
	);
};
export default Register;
