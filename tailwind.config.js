/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			rotate: {
				135: "151deg",
				85: "30deg",
			},
			backgroundColor: {
				primary: "#FEAD02",
				secondary: "#0c323d",
				// secondary: "#FF9B00",
				light: "#F1F1F1",
				"brand-red": "#E62F2B",
				black: "black",
				bxh: "linear-gradient(180deg, #FFDFB6 0%, #FFF 100%)",
				"light-red": "#ee1c43",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#FEAD02",

				secondary: "#0c323d",
				// secondary: "#FF9B00",
				light: "#F1F1F1",
				black11: "#111111",
				black00: "#000000",
				"brand-red": "#E62F2B",
				white: "#FFFFFF",
				"time-red": "#E62F2B",
				"secondary-light": "#9DA5AC",
				green02: "#02A981",
				green00: "#00A66A",
				grayE4: "#E4E4E4",
				grayF4: "#F4F5F6",
				grayBB: "#BBBBBB",
				gray9D: "#9DA5AC",
				redE6: "#E62F2B",
				orangeFF: "#FFEDD8",
				redE6: "#E62F2B",
				"light-red": "#ee1c43",
			},
			boxShadow: {
				"brand-red": "0px 4px 16px 0px rgba(255, 5, 0, 0.50)",
			},
			borderColor: {
				"brand-brown": "#7D7D7D",
				primary: "#FFAD01",
				light: "#F1F1F1",
			},
			boxShadow: {
				"3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
			},
			screens: {
				"3xl": "1600px",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
