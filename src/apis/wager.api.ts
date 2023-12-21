import axios from "axios";
const baseUrl ="https://isports.okchoi.com/api";
const wagerApi = {
	getWagers: () => {
		return axios.get(`${baseUrl}/getLiveOddChanges`);
	},
	shareWager :(body:any)=>{
		return axios.post(`${baseUrl}/share`,body)
	}
};
export default wagerApi;
