import { createSlice } from "@reduxjs/toolkit";

//	Constants for API status state
const IDLE = "idle";
const PENDING = "pending";
const SUCCESS = "success";
const ERROR = "error";
export const API_STATUS = { IDLE, PENDING, SUCCESS, ERROR };

const initAPIState = {
	status: null,
	error: null,
	result: null,
};

export const apiSlice = createSlice({
	name: "api",
	initialState: {
		login: initAPIState,
		register: initAPIState,
		deleteProject: initAPIState,
		getProject: initAPIState,
		getAllProjects: initAPIState,
		postProject: initAPIState,
		putProject: initAPIState,
	},
	reducers: {
		//	login reducers
		loginIdle: (state) => {
			state.login.status = IDLE;
		},
		loginPending: (state) => {
			state.login.status = PENDING;
		},
		loginSuccess: (state, action) => {
			state.login.status = SUCCESS;
			state.login.result = action.payload;
		},
		loginError: (state, action) => {
			state.login.status = ERROR;
			state.login.error = action.payload;
		},
		loginReset: (state) => {
			state.login = initAPIState;
		},

		//	register reducers
		registerIdle: (state) => {
			state.register.status = IDLE;
		},
		registerPending: (state) => {
			state.register.status = PENDING;
		},
		registerSuccess: (state, action) => {
			state.register.status = SUCCESS;
			state.register.result = action.payload;
		},
		registerError: (state, action) => {
			state.register.status = ERROR;
			state.register.error = action.payload;
		},
		registerReset: (state) => {
			state.register = initAPIState;
		},

		//	deleteProject reducers
		deleteProjectIdle: (state) => {
			state.deleteProject.status = IDLE;
		},
		deleteProjectPending: (state) => {
			state.deleteProject.status = PENDING;
		},
		deleteProjectSuccess: (state, action) => {
			state.deleteProject.status = SUCCESS;
			state.deleteProject.result = action.payload;
		},
		deleteProjectError: (state, action) => {
			state.deleteProject.status = ERROR;
			state.deleteProject.error = action.payload;
		},
		deleteProjectReset: (state) => {
			state.deleteProject = initAPIState;
		},

		//	getProject reducers
		getProjectIdle: (state) => {
			state.getProject.status = IDLE;
		},
		getProjectPending: (state) => {
			state.getProject.status = PENDING;
		},
		getProjectSuccess: (state, action) => {
			state.getProject.status = SUCCESS;
			state.getProject.result = action.payload;
		},
		getProjectError: (state, action) => {
			state.getProject.status = ERROR;
			state.getProject.error = action.payload;
		},
		getProjectReset: (state) => {
			state.getProject = initAPIState;
		},

		//	getAllProjects reducers
		getAllProjectsIdle: (state) => {
			state.getAllProjects.status = IDLE;
		},
		getAllProjectsPending: (state) => {
			state.getAllProjects.status = PENDING;
		},
		getAllProjectsSuccess: (state, action) => {
			state.getAllProjects.status = SUCCESS;
			state.getAllProjects.result = action.payload;
		},
		getAllProjectsError: (state, action) => {
			state.getAllProjects.status = ERROR;
			state.getAllProjects.error = action.payload;
		},
		getAllProjectsReset: (state) => {
			state.getAllProjects = initAPIState;
		},

		//	postProject reducers
		postProjectIdle: (state) => {
			state.postProject.status = IDLE;
		},
		postProjectPending: (state) => {
			state.postProject.status = PENDING;
		},
		postProjectSuccess: (state, action) => {
			state.postProject.status = SUCCESS;
			state.postProject.result = action.payload;
		},
		postProjectError: (state, action) => {
			state.postProject.status = ERROR;
			state.postProject.error = action.payload;
		},
		postProjectReset: (state) => {
			state.postProject = initAPIState;
		},

		//	putProject reducers
		putProjectIdle: (state) => {
			state.putProject.status = IDLE;
		},
		putProjectPending: (state) => {
			state.putProject.status = PENDING;
		},
		putProjectSuccess: (state, action) => {
			state.putProject.status = SUCCESS;
			state.putProject.result = action.payload;
		},
		putProjectError: (state, action) => {
			state.putProject.status = ERROR;
			state.putProject.error = action.payload;
		},
		putProjectReset: (state) => {
			state.putProject = initAPIState;
		},
	},
});
