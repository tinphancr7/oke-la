import axios from "axios";

const IsportInstance = axios.create({
	baseURL: "https://api.okchoi.com/api/v1",
});

const rankApi = {
	getRanks: (params: {league_id: string}) => {
		return IsportInstance.get("/standing", {
			params,
		});
	},
};
export default rankApi;
