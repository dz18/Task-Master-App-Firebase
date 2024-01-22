import React from "react";
import '../styling/styling.css'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheck} from "@fortawesome/free-solid-svg-icons";

export default function ToDo({ item, deleteItem, editItem, toggleComplete }) {
    return (
        <div className="ToDo">
            <p className={`${item.completed ? 'completed' : 'incomplete'}`}>{item.task}</p>
            <div>
                <FontAwesomeIcon className="faCheck" icon={faCheck} onClick={() => toggleComplete(item.id)}/>
                <FontAwesomeIcon className="faTrash" icon={faTrash} onClick={() => deleteItem(item.id)}/>
                <FontAwesomeIcon className="faEdit" icon={faPen} onClick={editItem}/> 
            </div>  
        </div>
    )
}