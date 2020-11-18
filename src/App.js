//	React
import { useEffect } from "react";
import { useGetAllProjects } from "./hooks";
//	Redux
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setToken, setLoginStatus, logoutUser } from "./store";
//	React Router components
import { Switch, Route, Link } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
//	Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Project from "./pages/Project";
import NewProject from "./pages/NewProject";
import UpdateProject from "./pages/UpdateProject";
import Error404 from "./pages/Error404";
//	Assets
import githubLogo from "./assets/github.png";

function App() {
	const dispatch = useDispatch();
	const loginStatus = useSelector((state) => state.user.loginStatus);
	const username = useSelector((state) => state.user.username);
	const token = useSelector((state) => state.user.token);

	//	Gets all projects and dispatches to store upon auth
	const getAllProjects = useGetAllProjects();
	useEffect(() => {
		if (loginStatus) {
			getAllProjects();
		}
	}, [getAllProjects, loginStatus]);

	//	Checks localStorage for cached credentials and dispatches to store if found
	const checkAuthCache = () => {
		if (localStorage.getItem("token") && localStorage.getItem("username")) {
			dispatch(setToken(localStorage.getItem("token")));
			dispatch(setUsername(localStorage.getItem("username")));
			dispatch(setLoginStatus(true));
		}
	};
	useEffect(checkAuthCache, [dispatch]);

	//	Caches credentials in localStorage on authentication
	const setAuthCache = () => {
		if (token && username && loginStatus) {
			localStorage.setItem("token", token);
			localStorage.setItem("username", username);
		}
	};
	useEffect(setAuthCache, [token, username, loginStatus, dispatch]);

	//	Removes credentials from store and localStorage on logout
	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.removeItem("token");
		localStorage.removeItem("username");
	};

	return (
		<Container fluid="true">
			<Navbar>
				<Navbar.Brand as={Link} to="/">
					VRFunder
				</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to="/explore">
						Explore
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					{loginStatus ? (
						<NavDropdown title={username} alignRight>
							<NavDropdown.Item as={Link} to={`/user/${username}`}>
								Profile
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={`/new-project`}>
								New Project
							</NavDropdown.Item>
							<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
						</NavDropdown>
					) : (
						<Nav.Link as={Link} to="/login">
							Login
						</Nav.Link>
					)}
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<AuthRoute exact path="/explore">
					<Explore />
				</AuthRoute>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<AuthRoute exact path="/user/:username">
					<User />
				</AuthRoute>
				<AuthRoute exact path="/project/:id">
					<Project />
				</AuthRoute>
				<AuthRoute exact path="/project/:id/update">
					<UpdateProject />
				</AuthRoute>
				<AuthRoute exact path="/new-project">
					<NewProject />
				</AuthRoute>
				<Route>
					<Error404 />
				</Route>
			</Switch>
			<Navbar fixed="bottom" className="justify-content-center">
				<Nav>
					<Nav.Link
						href="https://github.com/Build-Week-Tech-Funder/front-end"
						target="_blank"
					>
						<img src={githubLogo} width="25" height="25" alt="GitHub logo" />
					</Nav.Link>
				</Nav>
			</Navbar>
		</Container>
	);
}

export default App;
