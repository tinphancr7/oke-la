import Image from "next/image";
import React from "react";
const Footer = () => {
	return (
		// Ngay đây có z-50 nè ai muốn thêm thì thêm nha
		<div className="w-full h-full relative footer  px-4 md:py-8 pt-8 lg:p-0">
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
								<span>Liên hệ chúng tôi</span>
								<span className="px-4">|</span>
								<span>Hợp tác kinh doanh</span>
							</div>

							<span className="hidden md:block px-4 md:px-2">|</span>
							<div className="md:mt-0 mt-4">
								<span>Điều khoản và dịch vụ</span>
								<span className="px-4">|</span>
								<span>Chính sách quyền riêng tư</span>
							</div>
						</div>
					</div>
					<div className="bg-black/50 w-full h-[1px] md:my-6 my-10"></div>
					<div className="flex justify-between md:items-center md:flex-row flex-col-reverse pb-4 h-full">
						<p className="text-xs font-normal text-neutral-400 mt-8 md:mt-0 flex align-bottom h-full">
							Copyright @ 2023 Okchoi | 18+ Gamble responsibly
						</p>
						<div className="flex gap-4 items-center">
							<span className="text-xs font-normal text-black">
								Theo dõi chúng tôi:
							</span>
							<Image src="/images/youtube.png" width={24} height={24} alt="" />
							<Image src="/images/linkdin.png" width={24} height={24} alt="" />
							<Image src="/images/facebook.png" width={24} height={24} alt="" />
							<Image src="/images/twitch.png" width={24} height={24} alt="" />
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
