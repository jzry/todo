import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

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
    const [state, setState] = useState(
        {
            name: props.name,
            date: props.date
        }
    );

    const [isEditing, setEditing] = useState(false);

    // references for editing fields
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    const time = ((props.date).split(" ")[1]) + " " + ((props.date).split(" ")[2]);

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
        props.editTask(props.id, state.name, state.date);

        // re-init. date and setting editing state to false
        setState({name: props.name, date: props.date});
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
                                    type="datetime-local"
                                    value={state.date} 
                                    onChange={handleChange} 
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
                <div className="taskTitle listItem">
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                </div>
                <div className="listItem">
                    <label className="dateTimeLabel" htmlFor={props.id}>
                        {time}
                    </label>
                </div>
                <div className="btn-group listItem">
                    <button 
                        type="button" 
                        className="btn taskCtrl schedTaskView buttonScheme" 
                        onClick={ () => setEditing(true) } 
                        ref={editButtonRef}
                    >
                        <FiEdit /> <span className="visually-hidden">{props.name}</span>
                    </button>

                    <button
                        type="button"
                        className="btn taskCtrl schedTaskView buttonScheme"
                        onClick={ () => props.deleteTask(props.id) }
                    >
                       <AiOutlineDelete /> <span className="visually-hidden">{props.name}</span>
                    </button>
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