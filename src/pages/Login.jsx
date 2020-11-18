//	React
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useLogin } from "../hooks";
//	Redux
import { useSelector } from "react-redux";
import { API_STATUS } from "../store";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const history = useHistory();
	const login = useLogin(form);
	const status = useSelector((state) => state.api.login.status);

	function validateForm() {
		return form.username.length > 0 && form.password.length > 0;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	function handleSubmit(evt) {
		evt.preventDefault();
		login();
	}

	//	Redirect user on successful login
	useEffect(() => {
		if (status === API_STATUS.SUCCESS) {
			history.push("/");
		}
	}, [status, history]);

	return (
		<Container>
			Login
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type="username"
						name="username"
						value={form.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
			{status === API_STATUS.ERROR ? (
				<p>
					Error: Please verify your credentials are correct or try again later.
				</p>
			) : (
				""
			)}
			<Link to="/register">Need to register?</Link>
		</Container>
	);
}

export default Login;
