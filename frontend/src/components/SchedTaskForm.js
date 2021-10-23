import React, { useState }  from 'react';
import 
{ 
    Button, 
    Form 
} from 'react-bootstrap';

function SchedTaskForm(props)
{
    // Set blank states for name and date values
    const [state, setState] = useState(
        {
            name: "",
            date: "",
        }
    );

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

        props.addTask(state.name, state.date);
        state.name = "";
        state.date = "";
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

            <input 
                type="date"
                id="new-todo-date"
                className="inFields newTask"
                name="date"
                value={state.date}
                onChange={handleChange}
            />

            <Button type="submit" className="buttonScheme">
                Add
            </Button>
        </Form>
    );
};

export default SchedTaskForm;