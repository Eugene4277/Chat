const safeRequest = (cb) => {
	return async (req, res) => {
		try {
			await cb(req, res);
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ message: error.message, error: true, status: 500 });
		}
	};
};

module.exports = { safeRequest };
