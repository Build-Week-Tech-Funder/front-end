import { createSlice } from "@reduxjs/toolkit";

const initUserState = {
	username: "",
	token: "",
	role: "",
	loginStatus: false,
	projects: [],
	id: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState: { ...initUserState },
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setLoginStatus: (state, action) => {
			state.loginStatus = action.payload;
		},
		setUserRole: (state, action) => {
			state.role = action.payload;
		},
		setUserProjects: (state, action) => {
			state.projects = action.payload;
		},
		loginUser: (state, action) => {
			const { token, user } = action.payload;
			state.token = token;
			state.username = user.username;
			state.role = user.role;
			state.id = user.id;
			state.loginStatus = true;
		},
		logoutUser: (state, action) => {
			//	Setting the state to initUserState (with and without spread operator) does not work
			//	Unclear why that's the case, but this workaround is in place for now
			state.username = initUserState.username;
			state.token = initUserState.token;
			state.loginStatus = initUserState.loginStatus;
		},
	},
});
