import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	deleteProjectIdle,
	deleteProjectPending,
	deleteProjectSuccess,
	deleteProjectError,
	deleteProjectReset,
} from "../store";

export default function useDeleteProject(id) {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	useEffect(() => {
		dispatch(deleteProjectIdle());
		return () => {
			dispatch(deleteProjectReset());
		};
	}, [dispatch]);

	const del = useCallback(() => {
		dispatch(deleteProjectPending());
		api
			.delete(`projects/${id}`)
			.then((res) => {
				dispatch(deleteProjectSuccess(res.data));
			})
			.catch((err) => {
				dispatch(deleteProjectError(err));
			});
	}, [dispatch, api, id]);
	return del;
}
