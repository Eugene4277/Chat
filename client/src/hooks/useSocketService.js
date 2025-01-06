import { useCallback, useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketService = ({ user, activeChat }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState({});
	const [notifications, setNotifications] = useState({});

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

	const sendSocketMessage = useCallback(
		(message) => {
			if (socket) {
				socket.emit("sendMessage", message);
			}
		},
		[socket]
	);

	const socketSubscriber = useMemo(() => {
		if (socket) {
			return {
				subcribeOnGetMessage: (onResponse) =>
					socket.on("getMessage", onResponse),
				unsubscribeFromMessages: () => socket.off("getMessage"),
			};
		}
	}, [socket]);

	useEffect(() => {
		socket?.on("getNotification", (notification) => {
			if (activeChat?._id === notification.message.chatId) {
				notification = {
					...notification,
					isRead: true,
				};
			}
			setNotifications((prevNotifications) => {
				if (!prevNotifications[notification.message.chatId]) {
					return {
						...prevNotifications,
						[notification.message.chatId]: [notification],
					};
				}
				return {
					...prevNotifications,
					[notification.message.chatId]: [
						notification,
						...prevNotifications[notification.message.chatId],
					],
				};
			});
		});

		return () => {
			socket?.off("getNotification");
		};
	}, [activeChat, socket]);

	const resetNotifications = useCallback((chatId) => {
		setNotifications((prevNotifications) => {
			if (prevNotifications[chatId])
				return {
					...prevNotifications,
					[chatId]: prevNotifications[chatId].map((notification) => ({
						...notification,
						isRead: true,
					})),
				};
			return prevNotifications;
		});
	}, []);

	return {
		onlineUsers,
		sendSocketMessage,
		socketSubscriber,
		notifications,
		resetNotifications,
	};
};
