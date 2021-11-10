import React, { useState }  from 'react';
import { Button, Form } from 'react-bootstrap';
import { VscAdd } from 'react-icons/vsc'

function PriorityTaskForm(props){
    
    const [state, setState] = useState({ name: "" });

    // Maintains input states
    const handleChange = (e) =>
    {
        setState(
            {
                ...state, 
                [e.target.name]: e.target.value
            }
        )
    }

    // Adds a Task and clears the state
    function handleSubmit(e)
    {
        e.preventDefault();
        props.addTask(state.name);
        state.name = "";
    }

    return(
        <Form id="newTaskForm" onSubmit={handleSubmit}>
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
                <VscAdd />
            </Button>
        </Form>
    );
};

export default PriorityTaskForm;