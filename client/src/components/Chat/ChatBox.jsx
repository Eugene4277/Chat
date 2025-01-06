import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { Stack, Spinner } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";

const ChatBox = () => {
	const { user } = useContext(AuthContext);
	const { activeChat, messages, isLoading, sendMessage, setMessages } =
		useContext(ChatContext);
	const { sendSocketMessage, socketSubscriber } = useContext(SocketContext);
	const { recipientUser, getRecipientUser } = useFetchRecipientUser(user);
	const { subcribeOnGetMessage, unsubscribeFromMessages } = socketSubscriber;
	const [text, setText] = useState("");
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		getRecipientUser(activeChat);
	}, [activeChat]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		subcribeOnGetMessage((newMessage) => {
			if (activeChat?._id === newMessage.chatId) {
				setMessages((prev) => {
					return [...prev, newMessage];
				});
			}
		});

		return () => {
			unsubscribeFromMessages();
		};
	}, [activeChat]);

	const handleSend = (e) => {
		e.preventDefault();
		const data = {
			senderId: user._id,
			content: text,
			chatId: activeChat._id,
		};
		sendMessage(data, (res) => {
			setText("");
			setMessages((prev) => [...prev, res]);
			sendSocketMessage({
				...res,
				recipientId: recipientUser?._id,
			});
		});
	};

	return (
		<Stack className='chat-box' gap={4}>
			<div className='chat-header'>
				{recipientUser?.name ? (
					<>
						<img
							src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
							className='rounded-circle shadow-4'
							style={{ width: "2rem" }}
							alt='Avatar'
						/>
						<strong>{recipientUser?.name}</strong>
					</>
				) : null}
			</div>
			<Stack
				style={
					isLoading
						? {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
						  }
						: {}
				}
			>
				{isLoading ? (
					<div className='d-flex justify-content-center'>
						<Spinner
							as='div'
							animation='border'
							role='status'
							aria-hidden='true'
						/>
					</div>
				) : (
					<Stack gap={1} className='messages'>
						{messages.map((message) => (
							<Stack
								key={message._id}
								className={`${
									message.senderId === user._id
										? "message self align-self-end flex-grow-0"
										: "message align-self-start flex-grow-0"
								}
										
								`}
							>
								<span>{message.content}</span>
								<span className='message-footer'>
									{moment(message.createdAt).calendar()}
								</span>
							</Stack>
						))}
						<div ref={messagesEndRef} />
					</Stack>
				)}
			</Stack>
			<Stack
				direction='horizontal'
				gap={3}
				className='chat-input flow-grow-0 chat-footer'
			>
				<InputEmoji
					value={text}
					onChange={setText}
					fontFamily='nunito'
				/>
				<button
					disabled={!activeChat || !text}
					className='send-btn'
					onClick={handleSend}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-send-fill'
						viewBox='0 0 16 16'
					>
						<path d='M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z' />
					</svg>
				</button>
			</Stack>
		</Stack>
	);
};

export default ChatBox;
