const baseUrl = import.meta.env.VITE_BASE_URL;
const request = async ({ url, method, body = null, ...rest }) => {
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

export const postData = async ({ url, body }) => {
	const data = await request({
		url,
		method: "POST",
		body,
	});

	return data;
};

export const getData = async ({ url }) => {
	const data = await request({
		url,
		method: "GET",
	});

	return data;
};
