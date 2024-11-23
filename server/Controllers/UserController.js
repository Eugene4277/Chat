const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
const { safeRequest } = require("../utils/request");
const { createToken } = require("../utils/tokenGeneration");

const signUp = safeRequest(async (req, res) => {
	const { name, login, password } = req.body;

	let user = await userModel.findOne({ login });
	if (user)
		return res.status(400).json({
			message: "User with this login already exists",
			error: true,
			status: 400,
		});

	if (!name || !login || !password)
		return res.status(400).json({
			message: "All fields are required",
			error: true,
			status: 400,
		});

	if (!validator.isStrongPassword(password))
		return res.status(400).json({
			message: "Provide stronger password",
			error: true,
			status: 400,
		});

	user = new userModel({ name, login, password });
	const salt = await bcrypt.genSalt();
	const hashedPass = await bcrypt.hash(password, salt);
	user.password = hashedPass;

	await user.save(user._id);

	const token = createToken(user._id);

	res.status(200).send({ _id: user._id, name, login, token });
});

const signIn = safeRequest(async (req, res) => {
	const { login, password } = req.body;
	let user = await userModel.findOne({ login });
	if (user) {
		const isAuthorized = await bcrypt.compare(password, user.password);
		if (isAuthorized) {
			const token = createToken(user._id);

			res.status(200).send({
				_id: user._id,
				name: user.name,
				login,
				token,
			});
		} else {
			return res.status(400).json({
				message: "Password is incorrect",
				error: true,
				status: 400,
			});
		}
	} else {
		return res.status(400).json({
			message: "Login or password is not valid",
			error: true,
			status: 400,
		});
	}
});

const findUser = safeRequest(async (req, res) => {
	const userId = req.params.userId;

	let user = await userModel.findById(userId);

	if (user) {
		res.status(200).send({
			id: user._id,
			name: user.name,
		});
	} else {
		return res.status(400).json({
			message: "This user is not exists",
			error: true,
			status: 400,
		});
	}
});

const getUsers = safeRequest(async (req, res) => {
	let users = await userModel.find();

	if (users) {
		res.status(200).send(users);
	} else {
		return res
			.status(400)
			.json({ message: "No users yet", error: true, status: 400 });
	}
});
const searchUsers = safeRequest(async (req, res) => {
	const { query, userId } = req.body;
	const cleanQuery = query.replace(/([^a-z0-9]+)/gi, "");
	let users = await userModel.find({
		$or: [
			{ name: { $regex: cleanQuery, $options: "i" } },
			{ login: { $regex: cleanQuery, $options: "i" } },
		],
		$and: [{ _id: { $ne: userId } }],
	});

	if (users && users.length) {
		res.status(200).send(users);
	} else {
		return res.status(400).json({
			message: `No users found`,
			error: true,
			status: 400,
		});
	}
});

module.exports = { signUp, signIn, findUser, getUsers, searchUsers };
