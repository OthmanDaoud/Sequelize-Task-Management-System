// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:4000/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Task List
      </h2>
      <form
        onSubmit={createTask}
        className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Task Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    updateTask(task.id, { ...task, completed: !task.completed })
                  }
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  } hover:bg-green-600`}
                >
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => {
                    const updatedTitle = prompt("Enter new title:", task.title);
                    const updatedDescription = prompt(
                      "Enter new description:",
                      task.description
                    );
                    if (updatedTitle && updatedDescription) {
                      updateTask(task.id, {
                        ...task,
                        title: updatedTitle,
                        description: updatedDescription,
                      });
                    }
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
