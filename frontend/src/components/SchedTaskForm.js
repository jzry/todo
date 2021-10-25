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
            time: ""
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
        state.time = "";
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
                            type="date"
                            id="taskDate"
                            className="inFields"
                            name="date"
                            value={state.date}
                            onChange={handleChange}
                        />

                        <input
                            type="time"
                            id="taskTime"
                            className="inFields"
                            name="time"
                            value={state.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Button type="submit" className="buttonScheme schedButton">
                    Add
                </Button>
            </div>
        </Form>
    );
};

export default SchedTaskForm;