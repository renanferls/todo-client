import React from "react";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, icon, tasks, handleDelete, handleUpdate }) => {
    return (
        <section className='task_column'>
            <h2 className='task_column_heading'>
                <img className='task_column_icon' src={icon} alt='' /> {title}
            </h2>

            {tasks.map(
                (task) =>
                    (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                            index={task.id}
                            flag={task.current_state !== "DONE" ?? null}
                        />
                    )
            )}
        </section>
    );
};

export default TaskColumn;
