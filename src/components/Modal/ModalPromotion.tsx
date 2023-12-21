import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
interface ModalPromotionProps {
	title: string;
	setShowModalPromotion: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}
const ModalPromotion = ({
	title,
	setShowModalPromotion,
	children,
}: ModalPromotionProps) => {
	return (
		<div
			className="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative rounded-lg shadow border-b-2 border-[#AC650E]">
							<h4 className="text-[#AC650E] text-lg font-semibold text-center uppercase">
								{title}
							</h4>
							<div
								className="absolute top-4 right-4 cursor-pointer text-[#AC650E]"
								onClick={() => setShowModalPromotion(false)}
							>
								<AiFillCloseCircle size={24} />
							</div>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalPromotion;
