const chatModel = require("../Models/ChatModel");
const messageModel = require("../Models/MessageModel");
const { safeRequest } = require("../utils/request");

const createChat = safeRequest(async (req, res) => {
	const { firstId, secondId } = req.body;

	const chat = await chatModel.findOne({
		members: { $all: [firstId, secondId] },
	});

	if (chat) return res.status(200).json({ chat, isNew: false });

	const newChat = new chatModel({
		members: [firstId, secondId],
	});

	const response = await newChat.save();
	return res.status(200).json({ chat: response, isNew: true });
});

const findUserChats = safeRequest(async (req, res) => {
	const userId = req.params.userId;
	const userChats = await chatModel.find({
		members: { $in: [userId] },
	});

	const data = await Promise.all(
		userChats.map(async (chat) => {
			const message = await messageModel
				.findOne({ chatId: chat._id }, {}, { sort: { createdAt: -1 } })
				.exec();

			return {
				...chat.toObject(),
				lastMessage: message ? message.content : null,
				lastMessageTimestamp: message ? message.createdAt : null,
			};
		})
	);

	return res.status(200).json(data);
});
const findChat = safeRequest(async (req, res) => {
	const { firstId, secondId } = req.params;
	const chat = await chatModel.findOne({
		members: { $all: [firstId, secondId] },
	});

	return res.status(200).json(chat);
});

module.exports = { createChat, findUserChats, findChat };
