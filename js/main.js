// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// -------------------------------
	// 1. Contact Form Submission
	// -------------------------------
	const form = document.getElementById("contactForm");
	if (form) {
		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			const data = {
				name: form.fullName.value,
				email: form.email.value,
				subject: form.subject.value,
				message: form.message.value,
			};

			try {
				const response = await fetch("http://localhost:5000/api/contact", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				const result = await response.json();
				alert(result.msg);
				form.reset();
			} catch (err) {
				alert("Something went wrong!");
				console.error(err);
			}
		});
	}

	// -------------------------------
	// 2. Hire Me Button
	// -------------------------------
	const hireBtn = document.querySelector(".btn-1");
	if (hireBtn) {
		hireBtn.addEventListener("click", () => {
			const email = "zohaibabbas8557@gmail.com";
			const subject = encodeURIComponent("Project/Meeting Request");
			const body = encodeURIComponent(
				"Hi, I would like to discuss a project with you."
			);

			// Create a temporary <a> element and trigger click
			const link = document.createElement("a");
			link.href = `mailto:${email}?subject=${subject}&body=${body}`;
			link.click(); // Must be inside direct click handler
		});
	}

	// -------------------------------
	// 3. Pricing Plan Buttons
	// -------------------------------
	const planButtons = document.querySelectorAll(".plan-button");
	const contactForm = document.getElementById("contactForm");

	planButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const planName = btn.dataset.plan || "Pricing Plan";
			const subjectInput = document.getElementById("subject");

			if (contactForm) {
				contactForm.scrollIntoView({ behavior: "smooth" });
			}

			if (subjectInput) {
				subjectInput.value = `Inquiry about ${planName}`;
			}
		});
	});
});
