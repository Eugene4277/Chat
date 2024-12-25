const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

let onlineUsers = {};

const io = new Server({
	cors: process.env.CLIENT_URL,
});

io.on("connection", (socket) => {
	console.log("new connection", socket.id);
	socket.on("addNewUser", (userId) => {
		if (!onlineUsers[userId]) {
			onlineUsers[userId] = { userId, socketId: socket.id };
		}
		io.emit("getOnlineUsers", onlineUsers);
	});
	socket.on("disconnect", () => {
		onlineUsers = Object.entries(onlineUsers).reduce(
			(acc, [userId, user]) => {
				if (user.socketId != socket.id) acc[userId] = user;
				return acc;
			},
			{}
		);

		io.emit("getOnlineUsers", onlineUsers);
	});

	socket.on("sendMessage", (message) => {
		const { recipientId, ...recipientMessage } = message;
		if (onlineUsers[recipientId]) {
			const { socketId } = onlineUsers[recipientId];
			socket.to(socketId).emit("getMessage", recipientMessage);
			socket.to(socketId).emit("getNotification", {
				senderId: recipientMessage.senderId,
				chatId: recipientMessage.chatId,
				isRead: false,
				date: new Date(),
			});
		}
	});
});

io.listen(3000);
