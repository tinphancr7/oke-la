import Image from "next/image";
import React from "react";

function PreLoader() {
	return (
		<div className="bg-white fixed top-0 left-0 right-0 bottom-0 z-[9999999]">
			<div className="h-[64px] absolute left-0 right-0 bottom-0 top-0 m-auto flex justify-center">
				<Image
					src="/images/loader.gif"
					width={64}
					height={64}
					className="w-[64px] h-[64px]"
					alt="loading"
				/>
			</div>
		</div>
	);
}

export default PreLoader;
