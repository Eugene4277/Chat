const chatModel = require("../Models/ChatModel");
const { safeRequest } = require("../utils/request");

const createChat = safeRequest(async (req, res) => {
	const { firstId, secondId } = req.body;

	const chat = await chatModel.findOne({
		members: { $all: [firstId, secondId] },
	});

	if (chat) return res.status(200).json(chat);

	const newChat = new chatModel({
		members: [firstId, secondId],
	});

	const response = await newChat.save();
	return res.status(200).json(response);
});

const findUserChats = safeRequest(async (req, res) => {
	const userId = req.params.userId;
	const userChats = await chatModel.find({
		members: { $in: [userId] },
	});

	return res.status(200).json(userChats);
});
const findChat = safeRequest(async (req, res) => {
	const { firstId, secondId } = req.params;
	const chat = await chatModel.findOne({
		members: { $all: [firstId, secondId] },
	});

	return res.status(200).json(chat);
});

module.exports = { createChat, findUserChats, findChat };
