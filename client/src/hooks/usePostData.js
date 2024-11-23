import { useCallback } from "react";
import { postData } from "../utils/services";
import { useRequest } from "./useRequest";

export const usePostData = () => {
	const { handleRequest, error, isLoading, resetError } = useRequest();
	const handlePostData = useCallback(async (url, body, onSuccess = null) => {
		handleRequest(postData, { url, body }, onSuccess);
	}, []);

	return { handlePostData, error, isLoading, resetError };
};
