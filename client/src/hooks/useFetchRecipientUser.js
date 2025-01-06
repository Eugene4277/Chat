import { useCallback, useEffect, useState } from "react";
import { useGetData } from "./useGetData";

export const useFetchRecipientUser = (user) => {
	const { getData } = useGetData();
	const [recipientUser, setRecipientUser] = useState(null);

	const getRecipientUser = useCallback(
		(chat) => {
			if (chat) {
				const recipientUserId = chat.members.find(
					(memberId) => memberId != user._id
				);

				getData(`/users/find/${recipientUserId}`, (res) => {
					setRecipientUser(res);
				});
			}
		},
		[user]
	);

	return { recipientUser, getRecipientUser };
};
