import { useState, useEffect } from "react";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import usePostProject from "../hooks/usePostProject";

const schema = yup.object().shape({
	pname: yup.string().required().min(1),
	description: yup.string().required().min(1),
	location: yup.string().required().min(1),
	goal: yup.number().integer().positive().required(),
	image_url: yup.string().required().url(),
	external_url: yup.string().required().url(),
});

function NewProject() {
	const [form, setForm] = useState({
		pname: "",
		description: "",
		location: "",
		goal: "",
		image_url: "",
		external_url: "",
	});
	const [formValid, setFormValid] = useState(true);

	const { post, status, data, error } = usePostProject(form);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		post();
	};

	const validate = () => {
		schema.isValid(form).then((valid) => {
			setFormValid(valid);
		});
	};
	useEffect(validate, [form]);

	return (
		<Container>
			<h1>Create new project</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Project name</Form.Label>
					<Form.Control
						autoFocus
						name="pname"
						value={form.pname}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name="description"
						value={form.description}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="location">
					<Form.Label>Location</Form.Label>
					<Form.Control
						name="location"
						value={form.location}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="goal">
					<Form.Label>Goal</Form.Label>
					<Form.Control name="goal" value={form.goal} onChange={handleChange} />
				</Form.Group>

				<Form.Group controlId="image_url">
					<Form.Label>Image (external URL)</Form.Label>
					<Form.Control
						name="image_url"
						value={form.image_url}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="external_url">
					<Form.Label>Website</Form.Label>
					<Form.Control
						name="external_url"
						value={form.external_url}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button type="submit" disabled={!formValid}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default NewProject;
