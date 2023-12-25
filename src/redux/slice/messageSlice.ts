import {getMessagesHome} from "@/apis/message";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface MessageState {
	messagesHome: any[];
	totalDocHome: number;
}

const defaultState: MessageState = {
	messagesHome: [],
	totalDocHome: 0,
};

export const getListMessagesHome = createAsyncThunk(
	"message/getListMessagesHome",
	async ({pageIndex, pageSize}: any) => {
		const response = await getMessagesHome(pageIndex, pageSize);

		return response.data;
	}
);

const messageSlice = createSlice({
	name: "message",
	initialState: defaultState,
	reducers: {
		receiveMessageHome: (state, {payload}) => {
			state.messagesHome = [payload, ...state.messagesHome];
			state.totalDocHome = state.totalDocHome + 1;
		},
		initMessageHome: (state, {payload}) => {
			state.messagesHome = payload?.data || [];
			state.totalDocHome = payload?.totalDoc || 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getListMessagesHome.fulfilled, (state, {payload}) => {
				state.messagesHome = [
					...state.messagesHome,
					...(payload?.result?.data || []),
				];
				state.totalDocHome = payload?.result?.totalDoc || 0;
			})
			.addCase(getListMessagesHome.rejected, (state, {payload}) => {});
	},
});

const {reducer: messageReducer, actions} = messageSlice;

export const {receiveMessageHome, initMessageHome} = actions;

export default messageReducer;
