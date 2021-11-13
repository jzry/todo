import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonIcons from './ButtonIcons';

function NewTaskForm(props)
{
    const [state, setState] = useState(
        {
            name: "",
            date: ""
        }
    );

    const handleChange = (e) =>
    {
        setState(
            {
                ...state, 
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        if(props.type === "Priority")
        {
            props.addTask(state.name);
        }
        else 
        {
            props.addTask(state.name, state.date);
        }

        state.name = "";
        state.date = "";
    }

    return(
        <Form id="newListForm" onSubmit={handleSubmit}>
            {
                props.type === "Priority" ?         
                    <div id="newTaskForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="new-todo-input"
                            className="inFields newTask"
                            name="name"
                            autoComplete="off"
                            placeholder="New Task"
                            value={state.name}
                            onChange={handleChange}
                        />
                        <Button type="submit" className="buttonScheme">
                            <ButtonIcons type="Add"/>
                        </Button>
                    </div> : 
                    <div id="newSchedTaskForm"  className="form" onSubmit={handleSubmit}>
                        <div className="schedTaskForm">
                            <div className="splitFields">
                                <input
                                    type="text"
                                    id="taskName"
                                    className="inFields"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="New Task"
                                    value={state.name}
                                    onChange={handleChange}
                                />
            
                                <div id="dateTime">
                                    <input 
                                        type="datetime-local"
                                        id="taskDate"
                                        className="inFields"
                                        name="date"
                                        value={state.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="buttonScheme schedButton">
                                <ButtonIcons type="Add"/>
                            </Button>
                        </div>
                    </div>
            }
        </Form>
    );
}

export default NewTaskForm;