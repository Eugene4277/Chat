const jwt = require("jsonwebtoken");

const createToken = (...args) => {
	const secret = process.env.JWT_SECRET_KEY;

	return jwt.sign(
		{
			...args,
		},
		secret,
		{ expiresIn: "3d" }
	);
};

module.exports = { createToken };
