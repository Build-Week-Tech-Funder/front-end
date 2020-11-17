import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import authAxios from "../modules/authAxios";

//	Returns function that updates an existing project by id, along with request state
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