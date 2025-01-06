import { useCallback, useState } from "react";

export const useRequest = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleRequest = useCallback(
		async (requestFn, params, onSuccess = null) => {
			try {
				setIsLoading(true);
				setError(null);
				const res = await requestFn(params);
				if (res.error) {
					setError(res.message);
				} else {
					onSuccess?.(res);
				}
			} catch (error) {
				setError(error?.message ?? null);
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);
	const resetError = useCallback(() => setError(null), []);

	return { handleRequest, error, isLoading, resetError };
};
