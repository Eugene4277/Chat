import { createContext } from "react";
import { useMessageService } from "../hooks/useMessageService";

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user }) => {
	const {
		userChats,
		error,
		isLoading,
		createChat,
		activeChat,
		setActiveChat,
		messages,
		sendMessage,
		setMessages,
	} = useMessageService(user);

	return (
		<ChatContext.Provider
			value={{
				createChat,
				userChats,
				activeChat,
				setActiveChat,
				error,
				isLoading,
				messages,
				sendMessage,
				setMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
