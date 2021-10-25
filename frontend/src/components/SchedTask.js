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

function SchedTask(props)
{
    // states are initial values
    const [state, setState] = useState(
        {
            name: props.name,
            date: props.date,
            time: props.time
        }
    );

    const [isEditing, setEditing] = useState(false);

    // references for editing fields
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    const handleChange = (e) =>
    {
        setState(
            {
                ...state, 
                [e.target.name]: e.target.value,
            }
        )
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        props.editTask(props.id, state.name, state.date, state.time);

        // re-init. date and setting editing state to false
        state.name = props.name;
        state.date = props.date;
        state.time = props.time;
        setEditing(false);
    }


    const editingTemplate = (
        <ListGroup.Item className="listTask">
            <form className="form editTask" onSubmit={handleSubmit}>
                <label className="app" htmlFor={props.id}>
                    Edit Task:
                </label>
                    <div id="editSched" className="schedTaskForm">
                        <div className="editFields splitFields">
                            <input 
                                id={props.id} 
                                name="name" 
                                className="todo-text inFields" 
                                type="text"
                                value={state.name}
                                onChange={handleChange} 
                                ref={editFieldRef}
                            />

                            <div id="dateTime">
                                <input 
                                    id={props.id} 
                                    name="date" 
                                    className="todo-date inFields" 
                                    type="date"
                                    value={state.date} 
                                    onChange={handleChange} 
                                    ref={editFieldRef}
                                />

                                <input 
                                    id={props.id}
                                    name="time"
                                    className="inFields"
                                    type="time"
                                    value={state.time}
                                    onChange ={handleChange}
                                    ref={editFieldRef}
                                />
                            </div>
                        </div>
                    
                        <div className="editBtns editStack">
                            <Button 
                                type="button" 
                                className="buttonScheme schedButton" 
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="buttonScheme schedButton">
                                Save
                            </Button>
                        </div>
                    </div>
            </form>
        </ListGroup.Item>
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
                    <label className="dateTimeLabel" htmlFor={props.id}>
                        {props.date + " at " + props.time}
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

export default SchedTask;