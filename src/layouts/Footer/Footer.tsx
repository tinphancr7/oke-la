import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FaFacebookF, FaTiktok, FaTwitter, FaYoutube} from "react-icons/fa";
const Footer = () => {
	return (
		// Ngay đây có z-50 nè ai muốn thêm thì thêm nha
		<div className="w-full h-full relative footer   px-4 md:py-8 pt-8 lg:p-0">
			<div className="w-full h-full">
				<div className="xl:container mx-auto pt-2">
					<div className=" flex flex-col justify-center w-full ">
						<div className="flex items-center justify-between mb-1">
							<div className="w-20 h-20 relative">
								<Image
									src="/images/logo-banhgio.webp"
									alt="Logo"
									fill
									className="object-contain"
								/>
							</div>
						</div>
						<h3 className="uppercase text-[#FEAD00] font-bold text-xs pb-2 mt-2">
							Tất cả trong tầm tay
						</h3>
					</div>

					<div className="items-center justify-between text-black text-sm font-normal leading-[18px] h-full md:grid md:grid-cols-4">
						<p className="md:col-span-1">
							Banhgio - Kèo bóng hay, bay cùng chiến thắng. Tại đây mang đến
							những thông tin hữu ích về kèo hấp dẫn, giúp người chơi nâng cao
							tỷ lệ thắng cược. Có thể khẳng định rằng, đây chính là địa điểm
							đáng tin cậy cho những ai đam mê làm giàu và muốn kiếm tiền từ
							việc cá cược bóng đá. Banhgio - Đột phá để thành công
						</p>
						<div className="md:col-span-1"></div>
						<div className="md:col-span-2 w-full flex items-center md:justify-end flex-wrap mt-8 md:gap-2">
							<div>
								<Link className="hover:text-blue-500" href="/lien-he-chung-toi">
									Liên hệ chúng tôi
								</Link>
								<span className="px-4">|</span>
								<Link
									className="hover:text-blue-500"
									href="/hop-tac-kinh-doanh"
								>
									Hợp tác kinh doanh
								</Link>
							</div>

							<span className="hidden md:block px-4 md:px-2">|</span>
							<div className="md:mt-0 mt-4">
								<Link
									className="hover:text-blue-500"
									href="/dieu-khoan-dich-vu"
								>
									Điều khoản và dịch vụ
								</Link>
								<span className="px-4">|</span>
								<Link
									className="hover:text-blue-500"
									href="/chinh-sach-quyen-rieng-tu"
								>
									Chính sách quyền riêng tư
								</Link>
							</div>
						</div>
					</div>
					<div className="bg-black/50 w-full h-[1px] md:my-6 my-10"></div>
					<div className="flex justify-between md:items-center md:flex-row flex-col-reverse pb-4 h-full">
						<p className="text-xs font-normal text-neutral-400 mt-8 md:mt-0 flex align-bottom h-full">
							© All rights reserved. seolatop.com
						</p>
						<div className="flex gap-4 items-center">
							<span className="text-xs font-normal text-black">
								Theo dõi chúng tôi:
							</span>

							<Link href="/">
								<FaYoutube size={20} />
							</Link>
							<a
								href="https://www.tiktok.com/@banhgiosports?is_from_webapp=1&sender_device=pc"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaTiktok size={20} />
							</a>
							<a
								href="https://www.facebook.com/profile.php?id=61554548351310"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaFacebookF size={20} />
							</a>
							<Link href="/">
								<FaTwitter size={20} />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute  right-0 top-0 mix-blend-multiply max-h-full overflow-hidden">
				<div className="w-[200px] h-[200px] relative">
					<Image
						src="/images/footer1.png"
						fill
						className="w-full h-full object-cover"
						alt="footer1"
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
