import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { projectsSlice } from "./projectsSlice";
import { apiSlice, API_STATUS as API_STATUS_ALIAS } from "./apiSlice";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		projects: projectsSlice.reducer,
		api: apiSlice.reducer,
	},
});

export default store;

//	userSlice action exports
export const {
	setUsername,
	setToken,
	setLoginStatus,
	setUserRole,
	setUseProjects,
	loginUser,
	logoutUser,
} = userSlice.actions;

//	projectSlice action exports
export const { setProjectList } = projectsSlice.actions;

//	apiSlice action and constant exports
export const API_STATUS = API_STATUS_ALIAS;
export const {
	loginIdle,
	loginPending,
	loginSuccess,
	loginError,
	loginReset,
	registerIdle,
	registerPending,
	registerSuccess,
	registerError,
	registerReset,
	deleteProjectIdle,
	deleteProjectPending,
	deleteProjectSuccess,
	deleteProjectError,
	deleteProjectReset,
	getProjectIdle,
	getProjectPending,
	getProjectSuccess,
	getProjectError,
	getProjectReset,
	getAllProjectsIdle,
	getAllProjectsPending,
	getAllProjectsSuccess,
	getAllProjectsError,
	getAllProjectsReset,
	postProjectIdle,
	postProjectPending,
	postProjectSuccess,
	postProjectError,
	postProjectReset,
	putProjectIdle,
	putProjectPending,
	putProjectSuccess,
	putProjectError,
	putProjectReset,
} = apiSlice.actions;
