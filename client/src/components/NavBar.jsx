import { useContext } from "react";
import { Container, Nav, Navbar, Stack, Spinner } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import UserSearch from "./UserSearch";

const NavBar = () => {
	const { user, handleLogOut } = useContext(AuthContext);
	const { setActiveChat, setMessages } = useContext(ChatContext);

	const handleUserLogout = () => {
		handleLogOut();
		setActiveChat(null);
		setMessages([]);
	};

	return (
		<Navbar bg='dark' style={{ height: "3.75rem" }}>
			<Container>
				<h2>
					<Link to='/' className='link-light text-decoration-none'>
						Chat
					</Link>
				</h2>
				{user && (
					<span className='text-warning'>
						Logged in as {user.name}
					</span>
				)}
				<Nav>
					<Stack direction='horizontal' gap={3}>
						{user ? (
							<>
								<UserSearch />
								<Link
									to='/login'
									className='link-light text-decoration-none ms-auto'
									onClick={handleUserLogout}
								>
									Log Out
								</Link>
							</>
						) : (
							<>
								<NavLink
									to='/login'
									className={({ isActive }) =>
										isActive
											? "link-light text-decoration-none"
											: "link-secondary text-decoration-none"
									}
								>
									Login
								</NavLink>
								<NavLink
									to='/register'
									className={({ isActive }) =>
										isActive
											? "link-light text-decoration-none"
											: "link-secondary text-decoration-none"
									}
								>
									Register
								</NavLink>
							</>
						)}
					</Stack>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
