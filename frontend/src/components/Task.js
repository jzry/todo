import Button from "@restart/ui/esm/Button";
import React, { useEffect, useRef, useState } from "react";
import { Container, ListGroup } from 'react-bootstrap';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

function Task(props){

    const [newName, setNewName, newDate] = useState('');
    const [isEditing, setEditing] = useState(false);
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    var taskDate = "";

    function handleNameChange(e){
        setNewName(e.target.value);
    }

    function handleDateChange(e){
        taskDate = e.target.value;
    }

    function handleSubmit(e){
        e.preventDefault();
        props.editTask(props.id, newName, taskDate);
        setNewName("");
        taskDate = "";
        setEditing(false);
    }


    const editingTemplate = (
        
        <form className="form editTask" onSubmit={handleSubmit}>
            <div className="form-group listTask">
                <label className="todo-label" htmlFor={props.id}>
                    Update {props.name} :
                </label><br />
                <input 
                    id={props.id} 
                    name="name" 
                    className="todo-text inFields" 
                    type="text"
                    value={newName}
                    onChange={handleNameChange} 
                    ref={editFieldRef}
                />

                <input 
                    id={props.id} 
                    name="date" 
                    className="todo-date inFields" 
                    type="date"
                    value={newDate} 
                    onChange={handleDateChange} 
                    ref={editFieldRef}
                />
            </div>

            <div className="btn-group editBtns">
                <Button 
                    type="button" 
                    className="btn buttonScheme todo-cancel" 
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </Button>
                <Button type="submit" className="btn buttonScheme">
                    Save
                </Button>
            </div>
        </form>
    );

    const viewTemplate = (
        <ListGroup.Item className="listTask">
            <Container className="listGrid">
                <div className="taskTitle lg-3">
                    <input
                        id={props.id}
                        type="checkbox"
                        defaultChecked={props.completed}
                        onChange={() => props.toggleTaskCompleted(props.id)}
                        className="checkScheme"
                    />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>

                </div>
                <div className="btn-group">
                    <label className="todo-date" htmlFor={props.id} id="taskDate">
                    </label>

                    <Button 
                        type="button" 
                        className="btn taskCtrl taskView sm-3 buttonScheme" 
                        onClick={ () => setEditing(true) } 
                        ref={editButtonRef}
                    >
                        Edit <span className="visually-hidden">{props.name}</span>
                    </Button>

                    <Button
                        type="button"
                        className="btn taskCtrl taskView sm-3 buttonScheme"
                        onClick={ () => props.deleteTask(props.id) }
                    >
                        Delete <span className="visually-hidden">{props.name}</span>
                    </Button>
                </div>
            </Container>
        </ListGroup.Item>
      );

      useEffect(() => 
      {
        if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
          editButtonRef.current.focus();
        }
      }, [wasEditing, isEditing]);

    return(
        <div className="todo">
            {isEditing ? editingTemplate : viewTemplate}
        </div>
    );
};

export default Task;