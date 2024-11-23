import { useEffect, useState } from "react";
import { useGetData } from "./useGetData";

export const useFetchRecipientUser = (chat, user) => {
	const { handleGetData } = useGetData();
	const [recipientUser, setRecipientUser] = useState({});

	useEffect(() => {
		if (chat) {
			const recipientUserId = chat.members.find(
				(memberId) => memberId != user._id
			);

			handleGetData(`/users/find/${recipientUserId}`, (res) => {
				setRecipientUser(res);
			});
		}
	}, []);

	return { recipientUser };
};
