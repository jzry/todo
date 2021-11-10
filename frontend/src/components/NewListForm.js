import React, { useState } from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';

// Not completely functional yet..
function NewListForm(props)
{
    const [state, setState] = useState(
        {
            name: "",
            type: ""
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

        props.addList(state.name, state.type);
        state.name = "";
        state.type = "";
    }

    return(
        <div id="newListCard" className="app">
            <Card className="canvasCards">
                <Card.Body className="cardContent">
                <h1>New List</h1>
                    <Form id="newListForm" onSubmit={handleSubmit}>
                        <FloatingLabel htmlFor="listName" label="List Name">
                        <Form.Control type="text" id="listName" className="inFields" name="name" 
                            placeholder="New List" value={state.name} onChange={handleChange}/>
                        </FloatingLabel>
                        <br />
                        <div id="newRadios">
                            <div className="todo-label">List Type:</div>
                            <div className="todo-label taskTitle">
                                <Form.Check.Input type="radio" id="priority" className="checkScheme" 
                                    name="type" value="Priority" onChange={handleChange}/>
                                <label htmlFor="priority">Priority</label>
                            </div>
                            <div className="todo-label taskTitle">
                                <Form.Check.Input type="radio" id="schedule" className="checkScheme" 
                                    name="type" value="Schedule" onChange={handleChange}/>
                                <label htmlFor="schedule">Schedule</label>
                            </div>
                        </div>
                        <Button type="submit" id="newListSubmit" className="buttonScheme"> Add List </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewListForm;