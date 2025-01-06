import { useState, useEffect, useCallback } from "react";
import { useGetData } from "./useGetData";
import { usePostData } from "./usePostData";

export const useMessageService = (user) => {
	const [userChats, setUserChats] = useState([]);
	const [activeChat, setActiveChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const { getData, error, isLoading } = useGetData();
	const { postData } = usePostData();

	const createChat = useCallback((selectedUserId) => {
		const data = { firstId: user._id, secondId: selectedUserId };
		postData("/chats/create", data, (res) => {
			if (res.isNew) {
				setUserChats((prevUserChats) => [...prevUserChats, res.chat]);
			} else {
				setActiveChat(res.chat);
			}
		});
	}, []);

	const sendMessage = useCallback((data, onSuccess) => {
		postData("/messages/send", data, onSuccess);
	}, []);

	useEffect(() => {
		if (activeChat) {
			getData(`/messages/${activeChat._id}`, (res) => {
				setMessages(res);
			});
		}
	}, [activeChat]);

	useEffect(() => {
		if (user) {
			getData(`/chats/${user._id}`, (res) => {
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
