import React, { useState } from "react";
import {
  AddTaskButton,
  DeleteTaskButton,
  MarkAsDoneButton,
  TaskInput,
} from "./elements";
import { Task } from "types";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store the tasks
  const [newTaskContent, setNewTaskContent] = useState<string>(""); // State to store the content of the new task

  // Event handler for updating the new task content
  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTaskContent(event.target.value);
  };

  // Event handler for adding a new task
  const handleAddTask = () => {
    if (newTaskContent) {
      // Create a new task object and add it to the tasks array
      setTasks([
        ...tasks,
        { id: Date.now(), content: newTaskContent, status: false },
      ]);
      setNewTaskContent(""); // Clear the input field after adding the task
    }
  };

  // Event handler for deleting a task
  const handleDeleteTask = (id: number) => {
    // Filter out the task with the provided ID from the tasks array
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Event handler for marking a task as done
  const handleMarkAsDone = (id: number) => {
    // Update the status of the task with the provided ID to true
    const updatedTasks = tasks.reduce((newArray, curr) => {
      if (curr.id === id) {
        return [...newArray, { ...curr, status: true }];
      }
      return [...newArray, curr];
    }, []);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskInput
        type="text"
        label="Task Input"
        value={newTaskContent}
        onChange={handleNewTaskChange}
        data-testid="task-input"
      />
      <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>

      <ul>
        {/* Render each task in the tasks array */}
        {tasks.map((task, index) => (
          <li key={index}>
            {/* Strike through the task content if it is marked as done */}
            {task.status ? <s>{task.content}</s> : task.content}
            <MarkAsDoneButton
              onClick={() => handleMarkAsDone(task.id)}
              disabled={task.status}
            >
              Mark as done
            </MarkAsDoneButton>
            <DeleteTaskButton onClick={() => handleDeleteTask(task.id)}>
              Delete
            </DeleteTaskButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;