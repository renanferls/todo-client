import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tasks/task");
      console.log("🚀 ~ fetchTasks ~ response:", response.data)
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const createTask = async (newTask) => {
    console.log("🚀 ~ createTask ~ newTask:", newTask)
    try {
      const response = await axios.post("http://127.0.0.1:8000/tasks/task/", newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    console.log("🚀 ~ updateTask ~ updatedTask:", updatedTask)
    try {
      await axios.put(`http://127.0.0.1:8000/tasks/task/${updatedTask}`);
      const updatedTasksResponse = await axios.get("http://127.0.0.1:8000/tasks/task/");
      const updatedTasks = updatedTasksResponse.data;
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/task/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app">
      <TaskForm createTask={createTask} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks.filter((task) => task.current_state === "TODO")}
          handleDelete={deleteTask}
          handleUpdate={updateTask}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks.filter((task) => task.current_state === "INPROGRESS")}
          handleDelete={deleteTask}
          handleUpdate={updateTask}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks.filter((task) => task.current_state === "DONE")}
          handleDelete={deleteTask}
          handleUpdate={updateTask}
        />
      </main>
    </div>
  );
};

export default App;