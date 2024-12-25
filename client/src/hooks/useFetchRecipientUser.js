import { useCallback, useEffect, useState } from "react";
import { useGetData } from "./useGetData";

export const useFetchRecipientUser = (user) => {
	const { handleGetData } = useGetData();
	const [recipientUser, setRecipientUser] = useState(null);

	const getRecipientUser = useCallback(
		(chat) => {
			if (chat) {
				const recipientUserId = chat.members.find(
					(memberId) => memberId != user._id
				);

				handleGetData(`/users/find/${recipientUserId}`, (res) => {
					setRecipientUser(res);
				});
			}
		},
		[user]
	);

	return { recipientUser, getRecipientUser };
};
