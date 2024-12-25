import { createContext } from "react";
import { useSocketService } from "../hooks/useSocketService";

export const SocketContext = createContext({});

export const SocketContextProvider = ({ children, user }) => {
	const { onlineUsers, handleSendSocketMessage, socketObserver } =
		useSocketService(user);

	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				handleSendSocketMessage,
				socketObserver,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
