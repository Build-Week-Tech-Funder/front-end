// Custom hooks for interacting with our backend API
// useAuthAxios returns an axios instance with authentication headers and a baseURL
// Other hooks return functions that, when called, interact with the API and dispatch to the store as appropriate

import useLogin from "./useLogin";
import useRegister from "./useRegister";
import useGetAllProjects from "./useGetAllProjects";
import useGetProject from "./useGetProject";
import usePostProject from "./usePostProject";
import usePutProject from "./usePutProject";
import useDeleteProject from "./useDeleteProject";
import useAuthAxios from "./useAuthAxios";

export {
	useLogin,
	useRegister,
	useGetAllProjects,
	useGetProject,
	usePostProject,
	usePutProject,
	useDeleteProject,
	useAuthAxios,
};
