import { useState, useEffect } from "react";
import { useGetData } from "./useGetData";

export const useFetchUserChats = (user) => {
	const { handleGetData, error, isLoading } = useGetData();
	const [userChats, setUserChats] = useState([]);

	useEffect(() => {
		if (user) {
			handleGetData(`/chats/${user._id}`, (res) => {
				setUserChats(res);
			});
		}
	}, []);

	return { userChats, error, isLoading };
};
