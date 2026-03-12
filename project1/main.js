"use strict";
// Dark mode toggle functionality
const themeToggleBtn = document.getElementById("theme-toggle");
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        if (themeToggleBtn)
            themeToggleBtn.textContent = "Light Mode";
    }
    else {
        document.body.classList.remove("dark");
        if (themeToggleBtn)
            themeToggleBtn.textContent = "Dark Mode";
    }
}
// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");
themeToggleBtn === null || themeToggleBtn === void 0 ? void 0 : themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    applyTheme(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
});
// Contact form submission handler
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
contactForm === null || contactForm === void 0 ? void 0 : contactForm.addEventListener("submit", (event) => {
    var _a, _b;
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const name = (_a = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) !== null && _a !== void 0 ? _a : "";
    const email = (_b = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value.trim()) !== null && _b !== void 0 ? _b : "";
    if (name && email) {
        if (formMessage) {
            formMessage.textContent = `Thanks, ${name}! Your message has been received. I'll reply to ${email} soon.`;
        }
        contactForm.reset();
    }
});
