/**
 * Question 1
 */
const question1 = () => {
  const sidebarButton = document.getElementById("sidebar-button");
  const sidebar = document.getElementById("sidebar");

  sidebarButton.addEventListener("click", () => {
    const sidebarIsOpen = sidebar.classList.contains("opened");

    if (sidebarIsOpen) {
      // Close the sidebar
      sidebar.classList.remove("opened");
      sidebarButton.textContent = "›";
    } else {
      // Open the sidebar
      sidebar.classList.add("opened");
      sidebarButton.textContent = "‹";
    }
  });
};

/**
 * Question 2
 */
const question2 = () => {
  const taskName = document.getElementById("task-name");
  const addTodoButton = document.getElementById("add-todo");
  const todoListUl = document.getElementById("todo-list");

  addTodoButton.addEventListener("click", () => {
    if (taskName.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = taskName.value;
      todoListUl.append(li);
      taskName.value = "";
    }
  });
};

/**
 * Question 3
 */
const question3 = () => {
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const message = document.getElementById("message");

  const updateMessage = () => {
    message.textContent = `Hello ${firstNameInput.value} ${lastNameInput.value}!`;
  };

  firstNameInput.addEventListener("input", updateMessage);
  lastNameInput.addEventListener("input", updateMessage);
};

/**
 * We need to wait for the HTML file to fully load before running
 * our JavaScript, otherwise it won't be able to operate on the HTML
 * since it hasn't loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    question1();
  } catch (e) {
    console.error(e);
  }

  try {
    question2();
  } catch (e) {
    console.error(e);
  }

  try {
    question3();
  } catch (e) {
    console.error(e);
  }
});
