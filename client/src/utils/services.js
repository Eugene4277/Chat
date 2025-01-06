const baseUrl = import.meta.env.VITE_BASE_URL;
const requestFn = async ({ url, method, body = null, ...rest }) => {
	let options = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		...rest,
	};

	if (body) {
		options = {
			...options,
			body: JSON.stringify(body),
		};
	}

	const response = await fetch(`${baseUrl}${url}`, options);

	const data = await response.json();

	return data;
};

export const request = {
	get: async ({ url }) => {
		const data = await requestFn({
			url,
			method: "GET",
		});

		return data;
	},
	post: async ({ url, body }) => {
		const data = await requestFn({
			url,
			method: "POST",
			body,
		});

		return data;
	},
};
