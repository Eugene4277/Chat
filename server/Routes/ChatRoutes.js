const express = require("express");
const {
	createChat,
	findChat,
	findUserChats,
} = require("../Controllers/ChatController");

const router = express.Router();

router.post("/create", createChat);
router.get("/find/:firstId/:secondId", findChat);
router.get("/:userId", findUserChats);

module.exports = router;
