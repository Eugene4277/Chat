import { useContext, useEffect } from "react";
import moment from "moment";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import { useState } from "react";

const ChatListItem = ({ chat }) => {
	const { user } = useContext(AuthContext);
	const { recipientUser, getRecipientUser } = useFetchRecipientUser(user);
	const { activeChat, setActiveChat } = useContext(ChatContext);
	const { onlineUsers, notifications, resetNotifications } =
		useContext(SocketContext);
	const [messageInfo, setMessageInfo] = useState(() => ({
		lastMessage: chat.lastMessage,
		lastMessageTimestamp: chat.lastMessageTimestamp,
		unreadMessagesCount: 0,
	}));

	useEffect(() => {
		getRecipientUser(chat);
	}, []);

	useEffect(() => {
		if (activeChat?._id === chat._id) {
			resetNotifications(chat._id);
		}
	}, [activeChat]);

	useEffect(() => {
		if (notifications[chat._id]) {
			setMessageInfo({
				lastMessage: notifications[chat._id][0].message.content,
				lastMessageTimestamp:
					notifications[chat._id][0].message.createdAt,
				unreadMessagesCount: notifications[chat._id].reduce(
					(acc, curr) => (!curr.isRead ? acc + 1 : acc),
					0
				),
			});
		}
	}, [notifications]);

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
					{messageInfo.lastMessage ? (
						<div>{messageInfo.lastMessage}</div>
					) : (
						<div className='empty-message'>Empty chat ...</div>
					)}
				</div>
			</div>
			<div className='chat-item-meta-data'>
				<div className='date'>
					{messageInfo.lastMessageTimestamp
						? moment(messageInfo.lastMessageTimestamp).calendar()
						: null}
				</div>
				{messageInfo.unreadMessagesCount ? (
					<div
						className={`this-user-notifications  ${
							activeChat?._id === chat._id ? "active" : ""
						}`}
					>
						{messageInfo.unreadMessagesCount}
					</div>
				) : null}
			</div>
		</Stack>
	);
};

export default ChatListItem;
