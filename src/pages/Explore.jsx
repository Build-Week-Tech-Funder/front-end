import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import ProjectCard from "../components/ProjectCard";

function Explore() {
	const projects = useSelector((state) => state.projects.list);

	return (
		<Container>
			<h1>Explore Projects</h1>
			<CardColumns>
				{projects.map((project) => (
					<ProjectCard {...project} />
				))}
			</CardColumns>
		</Container>
	);
}

export default Explore;
