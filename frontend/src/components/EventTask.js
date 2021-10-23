import React, { useEffect, useRef, useState } from "react";
import { Button, Container, ListGroup } from 'react-bootstrap';

function usePrevious(value) 
{
    const ref = useRef();
    useEffect(() => 
    {
      ref.current = value;
    });
    return ref.current;
};

function EventTask(props)
{
    // states are initial values
    const [newName, setNewName] = useState(props.name);
    var newDate = useState(props.date);
    const [isEditing, setEditing] = useState(false);

    // references for editing fields
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    function handleNameChange(e)
    {
        setNewName(e.target.value);
    }

    function handleDateChange(e)
    {
        newDate = e.target.value;
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        props.editTask(props.id, newName, newDate);
        setNewName(newName);

        // re-init. date and setting editing state to false
        newDate = props.date;
        setEditing(false);
    }


    const editingTemplate = (
        
        <form className="form editTask" onSubmit={handleSubmit}>
            <label className="todo-label" htmlFor={props.id}>
                Edit Task:
            </label>
                <div className="editLine listTask">
                    <div className="editFields">
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
                
                    <div className="editBtns">
                        <Button 
                            type="button" 
                            className="buttonScheme todo-cancel" 
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="buttonScheme">
                            Save
                        </Button>
                    </div>
                </div>
        </form>
    );

    const viewTemplate = (
        <ListGroup.Item className="listTask">
            <Container className="listGrid">
                <div className="taskTitle listItem lg-3">
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
                <div className="listItem md-3">
                    <label className="dateLabel" htmlFor={props.id}>
                        {props.date +" "}
                    </label>
                </div>
                <div className="btn-group listItem md-3">
                    <Button 
                        type="button" 
                        className="btn taskCtrl schedTaskView sm-3 buttonScheme" 
                        onClick={ () => setEditing(true) } 
                        ref={editButtonRef}
                    >
                        Edit <span className="visually-hidden">{props.name}</span>
                    </Button>

                    <Button
                        type="button"
                        className="btn taskCtrl schedTaskView sm-3 buttonScheme"
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

export default EventTask;