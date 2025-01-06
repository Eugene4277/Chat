import { useCallback } from "react";
import { request } from "../utils/services";
import { useRequest } from "./useRequest";

export const useGetData = () => {
	const { handleRequest, error, isLoading, resetError } = useRequest();
	const getData = useCallback(async (url, onSuccess = null) => {
		handleRequest(request.get, { url }, onSuccess);
	}, []);

	return { getData, error, isLoading, resetError };
};
