import { createContext } from "react";
import { useUserChats } from "../hooks/useUserChats";

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
	} = useUserChats(user);

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
