import { useContext, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";

const ChatListItem = ({ chat }) => {
	const { user } = useContext(AuthContext);
	const { recipientUser, getRecipientUser } = useFetchRecipientUser(user);
	const { activeChat, setActiveChat } = useContext(ChatContext);
	const { onlineUsers } = useContext(SocketContext);

	useEffect(() => {
		getRecipientUser(chat);
	}, []);

	return (
		<Stack
			direction='horizontal'
			className={`user-card align-items-center p-3 justify-content-between ${
				activeChat?._id === chat._id ? "active" : ""
			}`}
			role='button'
			onClick={() => {
				setActiveChat(chat);
			}}
		>
			<div className='d-flex'>
				<div className='me-2 avatar-container'>
					<img
						src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
						className='rounded-circle shadow-4'
						style={{ width: "3rem" }}
						alt='Avatar'
					/>
					{onlineUsers[recipientUser?._id] && (
						<span
							className={`user-online ${
								activeChat?._id === chat._id ? "active" : ""
							}`}
						></span>
					)}
				</div>
				<div className='text-content'>
					<div className='name'>{recipientUser?.name}</div>
					<div>Message</div>
				</div>
			</div>
			<div className='d-flex flex-column align-items-end gap-1'>
				<div className='date'>date</div>
				<div
					className={`this-user-notifications  ${
						activeChat?._id === chat._id ? "active" : ""
					}`}
				>
					2
				</div>
			</div>
		</Stack>
	);
};

export default ChatListItem;
