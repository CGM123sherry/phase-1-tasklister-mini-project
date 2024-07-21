// // src/index.js
// //create eventlistener
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("create-task-form");\
//   //create a tasklist
//   const taskList = document.getElementById("tasks");
// //add eventlistener
//   form.addEventListener("submit", function(event) {
//     //prevent default
//     event.preventDefault();
//     //create a new task

//     const taskDescription = document.getElementById("new-task-description").value;
// //check if the task is empty
//     if (taskDescription !== "") {
//       //create a list task
//       const newTask = document.createElement("li");
//       newTask.textContent = taskDescription;
// //create a delete button
//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       //add event listner to the delete button
//       deleteButton.addEventListener("click", function() {
//         newTask.remove();
//       });
// //append the delete button
//       newTask.appendChild(deleteButton);
//       taskList.appendChild(newTask);
// ////create a button reset to clear the form after loading
//       form.reset(); 
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const taskDescription = document.getElementById("new-task-description").value;
    const priority = document.getElementById("priority").value;

    if (taskDescription !== "") {
      const newTask = document.createElement("li");
      newTask.textContent = taskDescription;
      newTask.dataset.priority = priority; // Store the priority in a data attribute

      // Set the color based on the priority
      if (priority === "high") {
        newTask.style.color = "red";
      } else if (priority === "medium") {
        newTask.style.color = "yellow";
      } else if (priority === "low") {
        newTask.style.color = "green";
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        newTask.remove();
      });

      newTask.appendChild(deleteButton);
      taskList.appendChild(newTask);

      form.reset(); // Clear the input field after adding the task
    }
  });

  const sortTasks = (order) => {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return order === 'asc' 
        ? priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]
        : priorityOrder[b.dataset.priority] - priorityOrder[a.dataset.priority];
    });
    tasks.forEach(task => taskList.appendChild(task));
  };

  document.getElementById("sort-asc").addEventListener("click", () => sortTasks('asc'));
  document.getElementById("sort-desc").addEventListener("click", () => sortTasks('desc'));
});
