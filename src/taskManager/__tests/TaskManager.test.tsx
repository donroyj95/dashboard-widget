import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskManager from "../TaskManager";

describe("TaskManager", () => {
  test("renders the TaskManager component", () => {
    const { getByText, getByTestId } = render(<TaskManager />);

    // Check if the Task Manager header is rendered
    expect(getByText("Task Manager")).toBeInTheDocument();

    // Check if the Add Task button is rendered
    expect(getByText("Add Task")).toBeInTheDocument();

    // Check if the Task Input field is rendered
    expect(getByTestId("task-input")).toBeInTheDocument();

  });

  test("adds a new task", () => {
    const { getByTestId, getByText } = render(<TaskManager />);

    // Get the Task Input field
    const taskInput = getByTestId("task-input");

    // Enter a task content
    fireEvent.change(taskInput, { target: { value: "New Task" } });

    // Get the Add Task button
    const addTaskButton = getByText("Add Task");

    // Click the Add Task button
    fireEvent.click(addTaskButton);

    // Check if the task is added to the list
    expect(getByText("New Task")).toBeInTheDocument();

    // Check if the Task Input is cleared after adding the task
    expect(taskInput.value).toBe("");
  });

  test("marks a task as done", () => {
    const { getByText, getByTestId } = render(<TaskManager />);

    // Add a new task
    const taskInput = getByTestId("task-input");
    const addTaskButton = getByText("Add Task");
    fireEvent.change(taskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    // Get the Mark as Done button for the task
    const markAsDoneButton = getByText("Mark as done");

    // Click the Mark as Done button
    fireEvent.click(markAsDoneButton);

    // Check if the task is marked as done
    expect(getByText("New Task")).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a task", () => {
    const { getByText, getByTestId, queryByText } = render(<TaskManager />);

    // Add a new task
    const taskInput = getByTestId("task-input");
    const addTaskButton = getByText("Add Task");
    fireEvent.change(taskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    // Get the Delete button for the task
    const deleteButton = getByText("Delete");

    // Click the Delete button
    fireEvent.click(deleteButton);

    // Check if the task is deleted from the list
    expect(queryByText("New Task")).toBeNull();
  });
});