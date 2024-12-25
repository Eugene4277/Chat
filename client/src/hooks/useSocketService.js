import { useCallback, useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketService = (user) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState({});

	useEffect(() => {
		const newSocket = io(socketUrl);
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [user]);

	useEffect(() => {
		if (socket && user) {
			socket.emit("addNewUser", user._id);
			socket.on("getOnlineUsers", (data) => {
				setOnlineUsers(data);
			});
		}

		return () => {
			if (socket) {
				socket.off("getOnlineUsers");
			}
		};
	}, [socket]);

	const handleSendSocketMessage = useCallback(
		(message) => {
			if (socket) {
				socket.emit("sendMessage", message);
			}
		},
		[socket]
	);

	const socketObserver = useMemo(() => {
		if (socket) {
			return {
				onGetMessage: (onResponse) =>
					socket.on("getMessage", onResponse),
				onCleanUp: () => socket.off("getMessage"),
			};
		}
	}, [socket]);

	return {
		onlineUsers,
		handleSendSocketMessage,
		socketObserver,
	};
};
