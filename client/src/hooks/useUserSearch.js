import { useState, useCallback, useContext } from "react";
import { usePostData } from "./usePostData";
import { AuthContext } from "../context/AuthContext";

export const useUserSearch = () => {
	const { user } = useContext(AuthContext);
	const { postData, error, isLoading, resetError } = usePostData();
	const [potentialConnections, setPotentialConnections] = useState([]);

	const resetPotentialConnections = useCallback(() => {
		setPotentialConnections([]);
	});

	const searchUsers = useCallback(
		(term) => {
			if (user && term) {
				const body = {
					query: term,
					userId: user._id,
				};
				postData(`/users/search`, body, (res) => {
					setPotentialConnections(res);
				});
			} else {
				setPotentialConnections([]);
				resetError();
			}
		},
		[user]
	);

	return {
		searchUsers,
		resetPotentialConnections,
		potentialConnections,
		error,
		isLoading,
	};
};
