//	React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProject, usePutProject, useDeleteProject } from "../hooks";
//	Redux
import { useSelector } from "react-redux";
import { API_STATUS } from "../store";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//	Other
import * as yup from "yup";

const schema = yup.object().shape({
	pname: yup.string().required().min(1),
	description: yup.string().required().min(1),
	location: yup.string().required().min(1),
	goal: yup.number().integer().positive().required(),
	image_url: yup.string().required().url(),
	external_url: yup.string().required().url(),
});

function UpdateProject() {
	const { id } = useParams();
	const [form, setForm] = useState({
		pname: "",
		description: "",
		location: "",
		goal: "",
		image_url: "",
		external_url: "",
	});
	const [formValid, setFormValid] = useState(false);
	const getProject = useGetProject(id);
	const putProject = usePutProject(id, form);
	const deleteProject = useDeleteProject(id);
	const getProjectStatus = useSelector((state) => state.api.getProject.status);
	const getProjectResult = useSelector((state) => state.api.getProject.result);

	//	Stopgap preventing infinite render loop
	useEffect(() => {
		if (getProjectStatus === API_STATUS.IDLE) {
			getProject();
		}
	}, [getProject, getProjectStatus]);

	//	When project is fetched, set data to local form state to allow user editing
	useEffect(() => {
		if (getProjectStatus === API_STATUS.SUCCESS) {
			const project = { ...getProjectResult };
			setForm({
				pname: project.pname,
				description: project.description,
				location: project.location,
				goal: project.goal,
				image_url: project.image_url,
				external_url: project.external_url,
			});
		}
	}, [getProjectStatus, getProjectResult]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const validate = () => {
		schema.isValid(form).then((valid) => {
			setFormValid(valid);
		});
	};
	useEffect(validate, [form]);

	const handleSubmit = (e) => {
		e.preventDefault();
		putProject();
	};

	const handleDelete = (e) => {
		e.preventDefault();
		deleteProject();
	};

	return (
		<Container>
			<h1>Update Project # {id}</h1>
			<Form>
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

				<Button disabled={!formValid} onClick={handleSubmit}>
					Submit
				</Button>
				<Button variant="danger" onClick={handleDelete}>
					Delete
				</Button>
			</Form>
		</Container>
	);
}

export default UpdateProject;
