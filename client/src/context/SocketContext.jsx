import { createContext } from "react";
import { useSocketService } from "../hooks/useSocketService";

export const SocketContext = createContext({});

export const SocketContextProvider = ({ children, user, activeChat }) => {
	const {
		onlineUsers,
		sendSocketMessage,
		socketSubscriber,
		notifications,
		resetNotifications,
	} = useSocketService({ user, activeChat });

	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				sendSocketMessage,
				socketSubscriber,
				notifications,
				resetNotifications,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
