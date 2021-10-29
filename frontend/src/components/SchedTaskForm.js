import React, { useState }  from 'react';
import { Button, Form } from 'react-bootstrap';

import ButtonIcons from './ButtonIcons';

function SchedTaskForm(props)
{
    // Set blank states for name and date values
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
        <Form id="newSchedTaskForm"  className="form" onSubmit={handleSubmit}>
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
        </Form>
    );
};

export default SchedTaskForm;