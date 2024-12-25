import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import UserSearch from "../UserSearch";

const ChatNavBar = () => {
	const { user, handleLogOut } = useContext(AuthContext);
	const { setActiveChat, setMessages } = useContext(ChatContext);

	const handleUserLogout = () => {
		handleLogOut();
		setActiveChat(null);
		setMessages([]);
	};

	return (
		<div className='chat-navbar'>
			<NavDropdown
				title={
					<img
						src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
						className='rounded-circle shadow-4'
						style={{ width: "2rem" }}
						alt='Avatar'
					/>
				}
			>
				<NavDropdown.Item disabled={true}>
					Logged in as {user.name}
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item>Profile</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={handleUserLogout}>
					Log Out
				</NavDropdown.Item>
			</NavDropdown>
			<UserSearch />
		</div>
	);
};

export default ChatNavBar;
