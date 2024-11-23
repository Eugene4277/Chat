import { useCallback } from "react";
import { getData } from "../utils/services";
import { useRequest } from "./useRequest";

export const useGetData = () => {
	const { handleRequest, error, isLoading, resetError } = useRequest();
	const handleGetData = useCallback(async (url, onSuccess = null) => {
		handleRequest(getData, { url }, onSuccess);
	}, []);

	return { handleGetData, error, isLoading, resetError };
};
