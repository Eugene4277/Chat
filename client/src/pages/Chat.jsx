import { useContext } from "react";
import { Container, Stack, Spinner } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext.jsx";
import { ChatContextProvider } from "../context/ChatContext.jsx";
import ChatListItem from "../components/Chat/ChatListItem.jsx";

const ChatContainer = () => {
	const { error, isLoading, userChats } = useContext(ChatContext);
	return (
		<Container>
			{isLoading && (
				<div className='d-flex justify-content-center'>
					<Spinner
						as='div'
						animation='border'
						role='status'
						aria-hidden='true'
					/>
				</div>
			)}
			{userChats?.length ? (
				<Stack
					direction='horizontal'
					gap={4}
					className='align-items-start'
				>
					<Stack className='flex-grow-0 messages-box pe-3' gap={3}>
						{userChats.map((chat) => {
							return <ChatListItem chat={chat} key={chat._id} />;
						})}
					</Stack>
					<div>ChatBox</div>
				</Stack>
			) : null}
		</Container>
	);
};

const Chat = () => {
	const { user } = useContext(AuthContext);
	return (
		<ChatContextProvider user={user}>
			<ChatContainer />
		</ChatContextProvider>
	);
};

export default Chat;
