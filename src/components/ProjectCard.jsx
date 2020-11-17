import Card from "react-bootstrap/Card";

function ProjectCard(props) {
	const { pname, description } = props;

	return (
		<Card>
			<Card.Body>
				<Card.Title>{pname}</Card.Title>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default ProjectCard;
