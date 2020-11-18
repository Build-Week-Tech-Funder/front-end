import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	setProjectList,
	getAllProjectsIdle,
	getAllProjectsPending,
	getAllProjectsSuccess,
	getAllProjectsError,
	getAllProjectsReset,
} from "../store";

export default function useGetAllProjects() {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	useEffect(() => {
		dispatch(getAllProjectsIdle());
		return () => {
			dispatch(getAllProjectsReset());
		};
	}, [dispatch]);

	const get = useCallback(() => {
		dispatch(getAllProjectsPending());
		api
			.get("projects")
			.then((res) => {
				dispatch(getAllProjectsSuccess(res.data));
				dispatch(setProjectList(res.data));
			})
			.catch((err) => {
				dispatch(getAllProjectsError());
			});
	}, [dispatch, api]);
	return get;
}
