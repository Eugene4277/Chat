import { useState, useEffect } from "react";
import { useGetData } from "./useGetData";

export const useFetchPotentialChats = (user) => {
	const { handleGetData, error, isLoading } = useGetData();
	const [potentialChats, setPotentialChats] = useState([]);

	useEffect(() => {
		if (user) {
			handleGetData(`/users/find`, (res) => {
				setPotentialChats(res);
			});
		}
	}, []);

	return { potentialChats, error, isLoading };
};
