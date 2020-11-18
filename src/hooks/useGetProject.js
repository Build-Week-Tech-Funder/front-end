import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	getProjectIdle,
	getProjectPending,
	getProjectSuccess,
	getProjectError,
	getProjectReset,
} from "../store";

export default function useGetProject(id) {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	useEffect(() => {
		console.log("id update");
	}, [id]);

	useEffect(() => {
		dispatch(getProjectIdle());
		return () => {
			dispatch(getProjectReset());
		};
	}, [dispatch]);

	const get = useCallback(() => {
		dispatch(getProjectPending());
		api
			.get(`projects/${id}`)
			.then((res) => {
				dispatch(getProjectSuccess(res.data));
			})
			.catch((err) => {
				dispatch(getProjectError(err));
			});
	}, [dispatch, api, id]);
	return get;
}
