require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const Contact = require("./models/contact");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Optional: send email
async function sendEmail({ name, email, message }) {
	if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return; // skip if not set

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: process.env.EMAIL_USER,
		subject: `New Contact Message from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	});
}

// Contact POST route
app.post("/api/contact", async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ msg: "All fields are required" });
	}

	try {
		const newContact = new Contact({ name, email, message });
		await newContact.save();

		// Send email notification (optional)
		await sendEmail({ name, email, message });

		res.status(200).json({ msg: "Message sent successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
});

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
