import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	postProjectIdle,
	postProjectPending,
	postProjectSuccess,
	postProjectError,
	postProjectReset,
} from "../store";

export default function usePostProject(form) {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	const username = useSelector((state) => state.user.username);

	useEffect(() => {
		dispatch(postProjectIdle());
		return () => {
			dispatch(postProjectReset());
		};
	}, [dispatch]);

	const post = useCallback(() => {
		dispatch(postProjectPending());
		api
			.post("projects", {
				pname: form.pname,
				description: form.description,
				location: form.location,
				goal: form.goal,
				image_url: form.image_url,
				external_url: form.external_url,
				fundraiser: username,
			})
			.then((res) => {
				dispatch(postProjectSuccess(res.data));
			})
			.catch((err) => {
				dispatch(postProjectError(err));
			});
	}, [dispatch, api, form, username]);
	return post;
}
