import { useCallback } from "react";
import { request } from "../utils/services";
import { useRequest } from "./useRequest";

export const usePostData = () => {
	const { handleRequest, error, isLoading, resetError } = useRequest();
	const postData = useCallback(async (url, body, onSuccess = null) => {
		handleRequest(request.post, { url, body }, onSuccess);
	}, []);

	return { postData, error, isLoading, resetError };
};
