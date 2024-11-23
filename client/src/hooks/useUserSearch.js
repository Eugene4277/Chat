import { useState, useCallback, useContext } from "react";
import { usePostData } from "./usePostData";
import { AuthContext } from "../context/AuthContext";

export const useUserSearch = () => {
	const { user } = useContext(AuthContext);
	const { handlePostData, error, isLoading, resetError } = usePostData();
	const [potentialChats, setPotentialChats] = useState([]);
	const searchUsers = useCallback(
		(term) => {
			if (user && term) {
				const body = {
					query: term,
					userId: user._id,
				};
				handlePostData(`/users/search`, body, (res) => {
					setPotentialChats(res);
				});
			} else {
				setPotentialChats([]);
				resetError();
			}
		},
		[user]
	);

	return { searchUsers, potentialChats, error, isLoading };
};
