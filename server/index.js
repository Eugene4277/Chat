const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./Routes/UserRoutes");
const chatRoute = require("./Routes/ChatRoutes");
const messageRoute = require("./Routes/MessageRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5000;
const db_uri = process.env.DB_URI;

app.listen(port);

mongoose
	.connect(db_uri)
	.then((data) => {
		console.log("connected");
	})
	.catch((err) => console.log(err));
