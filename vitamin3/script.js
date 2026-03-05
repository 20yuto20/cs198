const question1 = () => {
  const sidebar = document.getElementById("sidebar");
  const button = document.getElementById("sidebar-button");

  button.addEventListener("click", () => {
    sidebar.classList.toggle("opened");
    if (sidebar.classList.contains("opened")) {
      button.textContent = "‹";
    } else {
      button.textContent = "›";
    }
  });
};

const question2 = () => {
  const addButton = document.getElementById("add-todo");
  const input = document.getElementById("task-name");
  const list = document.getElementById("todo-list");

  addButton.addEventListener("click", () => {
    const taskName = input.value;
    if (taskName !== "") {
      const li = document.createElement("li");
      li.textContent = taskName;
      list.append(li);
      input.value = "";
    }
  });
};

const question3 = () => {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const message = document.getElementById("message");

  const updateMessage = () => {
    message.textContent = `Hello ${firstName.value} ${lastName.value}!`;
  };

  firstName.addEventListener("input", updateMessage);
  lastName.addEventListener("input", updateMessage);
};

document.addEventListener("DOMContentLoaded", (event) => {
  question1();
  question2();
  question3();
});
