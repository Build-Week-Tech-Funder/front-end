//	React
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRegister } from "../hooks";
//	Redux
import { useSelector } from "react-redux";
import { API_STATUS } from "../store";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

function Register() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		role: 2,
	});
	const history = useHistory();
	const register = useRegister(form);
	const status = useSelector((state) => state.api.register.status);

	function validateForm() {
		return form.username.length > 0 && form.password.length > 0;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSelect = (eventKey) => {
		setForm({ ...form, role: eventKey });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		register();
	};

	useEffect(() => {
		if (status === API_STATUS.SUCCESS) {
			history.push("/");
		}
	}, [status, history]);

	return (
		<Container>
			Register
			<Form onSubmit={handleSubmit}>
				<Form.Group size="sm" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						name="username"
						type="username"
						value={form.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group size="sm" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group size="sm" controlId="role">
					<Form.Label>Role</Form.Label>
					<DropdownButton
						id="dropdown-basic-button"
						title="Dropdown button"
						name="role"
						onSelect={handleSelect}
						value={form.role}
					>
						<Dropdown.Item eventKey="1">Fundraiser</Dropdown.Item>
						<Dropdown.Item eventKey="2">Funder</Dropdown.Item>
					</DropdownButton>
					<h4>You selected {form.role}</h4>
				</Form.Group>

				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Register
				</Button>
				{status === API_STATUS.ERROR ? "Error: Please try again later" : ""}
			</Form>
		</Container>
	);
}

export default Register;
