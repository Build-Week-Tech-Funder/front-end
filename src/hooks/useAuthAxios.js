import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useAuthAxios() {
	const token = useSelector((state) => state.user.token);

	const create = useCallback(() => {
		return axios.create({
			baseURL: "https://lamba-test.herokuapp.com/api/",
			headers: {
				Authorization: token,
			},
		});
	}, [token]);
	return create();
}
