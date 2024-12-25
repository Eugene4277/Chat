import { useState, useEffect, useCallback } from "react";
import { useGetData } from "./useGetData";
import { usePostData } from "./usePostData";

export const useUserChats = (user) => {
	const [userChats, setUserChats] = useState([]);
	const [activeChat, setActiveChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const { handleGetData, error, isLoading } = useGetData();
	const { handlePostData } = usePostData();

	const createChat = useCallback((selectedUserId) => {
		const data = { firstId: user._id, secondId: selectedUserId };
		handlePostData("/chats/create", data, (res) => {
			if (res.isNew) {
				setUserChats((prevUserChats) => [...prevUserChats, res.chat]);
			} else {
				setActiveChat(res.chat);
			}
		});
	}, []);

	const sendMessage = useCallback((data, onSuccess) => {
		handlePostData("/messages/send", data, onSuccess);
	}, []);

	useEffect(() => {
		if (activeChat) {
			handleGetData(`/messages/${activeChat._id}`, (res) => {
				setMessages(res);
			});
		}
	}, [activeChat]);

	useEffect(() => {
		if (user) {
			handleGetData(`/chats/${user._id}`, (res) => {
				setUserChats(res);
			});
		}
	}, [user]);

	return {
		userChats,
		activeChat,
		setActiveChat,
		createChat,
		sendMessage,
		error,
		isLoading,
		messages,
		setMessages,
	};
};
