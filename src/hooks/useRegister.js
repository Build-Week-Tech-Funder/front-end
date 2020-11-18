import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useLogin from "./useLogin";
import {
	registerIdle,
	registerPending,
	registerSuccess,
	registerError,
	registerReset,
} from "../store";

export default function useRegister(form) {
	const dispatch = useDispatch();
	const login = useLogin(form);

	useEffect(() => {
		dispatch(registerIdle());
		return () => {
			dispatch(registerReset());
		};
	}, [dispatch]);

	const register = useCallback(() => {
		dispatch(registerPending());
		axios
			.post("https://lamba-test.herokuapp.com/api/auth/register", {
				username: form.username,
				password: form.password,
				role: form.role,
			})
			.then((res) => {
				dispatch(registerSuccess(res.data));
				login();
			})
			.catch((err) => {
				dispatch(registerError(err));
			});
	}, [dispatch, form, login]);
	return register;
}
