import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ createTask}) => {
  const [taskData, setTaskData] = useState({
    title: "",
    current_state: "TODO",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(taskData);
    setTaskData({ title: "", current_state: "TODO" });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          className="task_input"
          placeholder="Enter your task name"
          onChange={handleChange}
          required
        />

        <div className="task_form_bottom_line">
          <div>
            <select
              name="current_state"
              value={taskData.current_state}
              className="task_status"
              onChange={handleChange}
            >
              <option value="TODO">To Do</option>
              <option value="INPROGRESS">Doing</option>
              <option value="DONE">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;