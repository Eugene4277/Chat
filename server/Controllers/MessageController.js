const messageModel = require("../Models/MessageModel");
const { safeRequest } = require("../utils/request");

const createMessage = safeRequest(async (req, res) => {
	const { chatId, senderId, content } = req.body;

	const message = new messageModel({ chatId, senderId, content });

	const response = await message.save();

	return res.status(200).json(response);
});

const getMessages = safeRequest(async (req, res) => {
	const { chatId } = req.params;

	const messages = await messageModel.find({ chatId });

	return res.status(200).json(messages);
});

module.exports = { createMessage, getMessages };
