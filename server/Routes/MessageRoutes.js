const express = require("express");
const {
	createMessage,
	getMessages,
} = require("../Controllers/MessageController");

const router = express.Router();

router.post("/send", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;
