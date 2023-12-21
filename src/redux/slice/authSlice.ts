import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isOpen: boolean;
}

const defaultState: AuthState = {
  isOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    showLogin: (state) => {
      state.isOpen = true;
    },
    hideLogin: (state) => {
      state.isOpen = false;
    },
  },
});

const { reducer: authReducer, actions } = authSlice;

export const { showLogin, hideLogin } = actions;

export default authReducer;
