import { useContext } from "react";
import { Container, Stack, Spinner } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { ChatContextProvider } from "../context/ChatContext";
import { SocketContextProvider } from "../context/SocketContext";
import ChatListItem from "../components/Chat/ChatListItem";
import ChatBox from "../components/Chat/ChatBox";
import ChatNavBar from "../components/Chat/ChatNavBar";

const ChatContainer = () => {
	const { isLoading, userChats } = useContext(ChatContext);
	return (
		<Container>
			{isLoading && !userChats?.length && (
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
				<Stack direction='horizontal' className='align-items-start'>
					<Stack className='flex-grow-0'>
						<ChatNavBar />
						<Stack className='flex-grow-0 messages-box p-1'>
							{userChats.map((chat) => {
								return (
									<ChatListItem chat={chat} key={chat._id} />
								);
							})}
						</Stack>
					</Stack>
					<ChatBox />
				</Stack>
			) : null}
		</Container>
	);
};
const Chat = ({ user }) => {
	return (
		<ChatContextProvider user={user}>
			<SocketContextProvider user={user}>
				<ChatContainer />
			</SocketContextProvider>
		</ChatContextProvider>
	);
};

export default Chat;
