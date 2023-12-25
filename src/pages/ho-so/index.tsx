import {Form, Input, Modal, Button as AntButton} from "antd";
import Button from "@/components/button/Button";
import ProfileLayout from "@/layouts/ProfileLayout";
import Image from "next/image";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {changeEmail, changePassword} from "@/apis/user";

const MyProfile = () => {
	const [modalPassword, setModalPassword] = useState(false);
	const [modalEmail, setModalEmail] = useState(false);
	const [formChangePassword] = Form.useForm();
	const [formChangeEmail] = Form.useForm();

	const resetForm = () => {
		formChangePassword.resetFields();
		formChangeEmail.resetFields();
	};

	const handleChangePassword = async () => {
		try {
			const password = formChangePassword.getFieldValue("password");
			const newPassword = formChangePassword.getFieldValue("newPassword");

			const result = await changePassword(password, newPassword);

			toast.success("Thay đổi mật khẩu thành công");
		} catch (error) {
			console.log(error);
			toast.error("Thay đổi mật khẩu thất bại");
		}
	};

	const handleChangeEmail = async () => {
		try {
			const password = formChangeEmail.getFieldValue("password");
			const email = formChangeEmail.getFieldValue("email");

			const result = await changeEmail(password, email);

			toast.success("Cập nhật email thành công");
		} catch (error) {
			toast.error("Thay đổi email thất bại");
		}
	};

	return (
		<div className="w-full col-span-7">
			<ToastContainer />
			<h5 className="text-lg font-bold pb-6">Thông tin cá nhân</h5>
			<div className="grid grid-cols-12 gap-8">
				<div className=" col-span-12 md:col-span-6">
					<div className="border flex items-center justify-between p-4">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 relative">
								<Image
									src="/images/lock.png"
									fill
									className="w-full h-full object-fill"
									alt=""
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-base font-bold text-black">Mật khẩu</span>
								<span className="text-xs font-normal text-grayBB">
									Đổi mật khẩu
								</span>
							</div>
						</div>
						<Button
							onClick={() => setModalPassword(true)}
							className="text-white text-sm bg-secondary px-4 py-2 text-sm"
						>
							Sửa đổi
						</Button>
					</div>
				</div>
				<div className="col-span-12 md:col-span-6">
					<div className="border flex items-center justify-between p-4">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 relative">
								<Image
									src="/images/lock.png"
									fill
									className="w-full h-full object-fill"
									alt=""
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-base font-bold text-black">Email</span>
								<span className="text-xs font-normal text-grayBB">
									em*****.com
								</span>
							</div>
						</div>
						<Button
							onClick={() => setModalEmail(true)}
							className="text-white text-sm bg-secondary px-4 py-2 text-sm"
						>
							Sửa đổi
						</Button>
					</div>
				</div>
			</div>
			<Modal
				open={modalPassword}
				onCancel={() => {
					setModalPassword(false);
					resetForm();
				}}
			>
				<div className="">
					<h2 className="font-bold text-[20px]">Đổi mật khẩu</h2>
					<Form
						form={formChangePassword}
						className="mt-8"
						onFinish={handleChangePassword}
					>
						<Form.Item
							rules={[
								{
									type: "string",
								},
								{
									min: 6,
									message: "Mật khẩu phải có tối thiểu 6 kí tự",
								},
								{
									max: 32,
									message: "Mật khẩu tối đa 32 kĩ tự",
								},
								{
									required: true,
									message: "Mật khẩu là bắt buộc",
								},
							]}
							label="Mật khẩu hiện tại"
							name={"password"}
						>
							<Input type="password" placeholder="Nhập mật khẩu hiện tại" />
						</Form.Item>
						<Form.Item
							label="Mật khẩu mới"
							rules={[
								{
									type: "string",
								},
								{
									min: 6,
									message: "Mật khẩu phải có tối thiểu 6 kí tự",
								},
								{
									max: 32,
									message: "Mật khẩu tối đa 32 kĩ tự",
								},
								{
									required: true,
									message: "Mật khẩu là bắt buộc",
								},
							]}
							name={"newPassword"}
						>
							<Input type="password" placeholder="Nhập mật khẩu mới" />
						</Form.Item>
						<Form.Item
							label="Nhập lại mật khẩu mới"
							name={"confirmPassword"}
							rules={[
								{
									type: "string",
								},
								{
									min: 6,
									message: "Mật khẩu phải có tối thiểu 6 kí tự",
								},
								{
									max: 32,
									message: "Mật khẩu tối đa 32 kĩ tự",
								},
								{
									required: true,
									message: "Mật khẩu là bắt buộc",
								},
								({getFieldValue}) => ({
									validator(_, value) {
										if (!value || getFieldValue("newPassword") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Mật khẩu không khớp"));
									},
								}),
							]}
						>
							<Input type="password" placeholder="Nhập lại mật khẩu mới" />
						</Form.Item>
						<Form.Item>
							<AntButton
								type="primary"
								className="bg-secondary w-full button-submit"
								htmlType="submit"
							>
								Đổi mật khẩu
							</AntButton>
						</Form.Item>
					</Form>
				</div>
			</Modal>
			<Modal
				open={modalEmail}
				onCancel={() => {
					setModalEmail(false);
					resetForm();
				}}
			>
				<div className="">
					<h2 className="font-bold text-[20px]">Cập nhật email</h2>
					<Form
						form={formChangeEmail}
						className="mt-8"
						onFinish={handleChangeEmail}
					>
						<Form.Item
							rules={[
								{
									type: "email",
									message: "Email không đúng định dạng",
								},
								{
									required: true,
									message: "Email là bắt buộc",
								},
							]}
							name={"email"}
							label="Email"
						>
							<Input type="text" placeholder="Nhập email mới" />
						</Form.Item>
						<Form.Item
							label="Mật khẩu"
							name={"password"}
							rules={[
								{
									type: "string",
								},
								{
									min: 6,
									message: "Mật khẩu phải có tối thiểu 6 kí tự",
								},
								{
									max: 32,
									message: "Mật khẩu tối đa 32 kĩ tự",
								},
								{
									required: true,
									message: "Mật khẩu là bắt buộc",
								},
							]}
						>
							<Input type="password" placeholder="Nhập mật khẩu" />
						</Form.Item>
						<Form.Item>
							<AntButton
								type="primary"
								className="bg-secondary w-full button-submit"
								htmlType="submit"
							>
								Cập nhật email
							</AntButton>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</div>
	);
};
MyProfile.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;

export default MyProfile;
