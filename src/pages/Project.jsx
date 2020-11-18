//	React
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProject } from "../hooks";
//	Bootstrap components
import Container from "react-bootstrap/Container";

function Project() {
	const { id } = useParams();
	const getProject = useGetProject(id);

	useEffect(() => {
		getProject();
	}, [getProject]);

	return (
		<Container>
			<h1>Project # {id}</h1>
			<Link to={`/project/${id}/update`}>Update</Link>
		</Container>
	);
}

export default Project;
