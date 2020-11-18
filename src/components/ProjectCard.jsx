import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function ProjectCard(props) {
	const { pname, description, id } = props;

	return (
		<Card>
			<Card.Body>
				<Card.Title>{pname}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Card.Text>
					<Link to={`/project/${id}`}>Learn More</Link>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default ProjectCard;
