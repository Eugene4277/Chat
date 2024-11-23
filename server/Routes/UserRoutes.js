const express = require("express");
const {
	signUp,
	signIn,
	findUser,
	getUsers,
	searchUsers,
} = require("../Controllers/UserController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/search", searchUsers);
router.get("/find/:userId", findUser);
router.get("/find", getUsers);

module.exports = router;
