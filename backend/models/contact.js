const mongoose = require("mongoose"); // <-- Add this line

const ContactSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String }, // optional
	message: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactSchema);
