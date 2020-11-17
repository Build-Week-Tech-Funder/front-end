import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import authAxios from "../modules/authAxios";

//	Posts new project and returns request state
export default function usePostProject(form) {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const token = useSelector((state) => state.user.token);
	const username = useSelector((state) => state.user.username);

	const post = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
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
				setStatus("success");
				setData(res.data);
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [token, form, username]);

	return { post, status, data, error };
}
