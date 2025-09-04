const Contact = require("./models/Contact");

app.post("/api/contact", async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ msg: "All fields are required" });
	}

	try {
		const newContact = new Contact({ name, email, message });
		await newContact.save();
		res.status(200).json({ msg: "Message sent successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
});
