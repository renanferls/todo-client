import React from "react";

import "./TaskCard.css";
import deleteIcon from "../assets/delete.png";
import steponIcon from "../assets/stepon.png"

const TaskCard = ({ title, handleDelete, handleUpdate, index, flag=null }) => {
    return (
        <article className='task_card'>
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line'>
                <div
                    className='task_delete'
                    onClick={() => handleDelete(index)}>
                    <img src={deleteIcon} className='delete_icon' alt='' />
                </div>
                { flag ? 
                (<div
                    className='task_update'
                    onClick={() => handleUpdate(index)}>
                    <img src={steponIcon} className='update_icon' alt='' />
                </div>) : null
                }
            </div>
        </article>
    );
};

export default TaskCard;
