const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, minLength: 3 },
		login: { type: String, required: true, minLength: 3, unique: true },
		password: { type: String, required: true, minLength: 3 },
	},
	{
		timestamps: true,
	}
);

userSchema.index({ name: "text", login: "text" });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
