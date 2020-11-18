import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
	name: "projects",
	initialState: {
		list: [],
	},
	reducers: {
		setProjectList: (state, action) => {
			state.list = action.payload;
		},
	},
});
