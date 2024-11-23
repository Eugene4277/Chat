import { useCallback, useState } from "react";
import { usePostData } from "./usePostData";

export const useAuthUser = () => {
	const { handlePostData, error, isLoading } = usePostData();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("currentUser"))
	);

	const handleAuthFormSubmit = useCallback((url, data) => {
		handlePostData(url, data, (res) => {
			localStorage.setItem("currentUser", JSON.stringify(res));
			setUser(res);
		});
	}, []);

	const handleLogOut = useCallback(() => {
		setUser(null);
		localStorage.removeItem("currentUser");
	}, []);

	return { handleAuthFormSubmit, handleLogOut, error, isLoading, user };
};