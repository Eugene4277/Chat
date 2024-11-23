import { createContext } from "react";
import { useFetchUserChats } from "../hooks/useFetchUserChats";

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user }) => {
	const { userChats, error, isLoading } = useFetchUserChats(user);

	return (
		<ChatContext.Provider value={{ userChats, error, isLoading }}>
			{children}
		</ChatContext.Provider>
	);
};
