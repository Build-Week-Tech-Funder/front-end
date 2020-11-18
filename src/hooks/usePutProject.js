import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	putProjectIdle,
	putProjectPending,
	putProjectSuccess,
	putProjectError,
	putProjectReset,
} from "../store";

export default function usePutProject(id, form) {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	const username = useSelector((state) => state.user.username);

	useEffect(() => {
		dispatch(putProjectIdle());
		return () => {
			dispatch(putProjectReset());
		};
	}, [dispatch]);

	const put = useCallback(() => {
		dispatch(putProjectPending());
		api
			.put(`projects/${id}`, {
				...form,
				fundraiser: username,
			})
			.then((res) => {
				dispatch(putProjectSuccess(res.data));
			})
			.catch((err) => {
				dispatch(putProjectError(err));
			});
	}, [dispatch, api, username, id, form]);
	return put;
}

/* //	Returns function that updates an existing project by id, along with request state
export default function usePutProjectById(id, pname, description) {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const token = useSelector((state) => state.user.token);

	const put = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
		api
			.put(`projects/${id}`, {
				pname: pname,
				description: description,
			})
			.then((res) => {
				setStatus("success");
				setData(res.data);
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [description, id, pname, token]);

	return { put, status, data, error };
}
 */
