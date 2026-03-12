// Dark mode toggle functionality
const themeToggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;

function applyTheme(isDark: boolean): void {
  if (isDark) {
    document.body.classList.add("dark");
    if (themeToggleBtn) themeToggleBtn.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    if (themeToggleBtn) themeToggleBtn.textContent = "Dark Mode";
  }
}

// Load saved theme from localStorage
const savedTheme: string | null = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeToggleBtn?.addEventListener("click", () => {
  const isDark: boolean = document.body.classList.contains("dark");
  applyTheme(!isDark);
  localStorage.setItem("theme", !isDark ? "dark" : "light");
});

// Contact form submission handler
const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
const formMessage = document.getElementById("form-message") as HTMLParagraphElement | null;

contactForm?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  const name: string = nameInput?.value.trim() ?? "";
  const email: string = emailInput?.value.trim() ?? "";

  if (name && email) {
    if (formMessage) {
      formMessage.textContent = `Thanks, ${name}! Your message has been received. I'll reply to ${email} soon.`;
    }
    contactForm.reset();
  }
});
