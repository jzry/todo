import React, { useRef, useState } from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';

// Not completely functional yet..
function NewListForm(props)
{
    const [state, setState] = useState(
        {
            name: ""
        }
    );

    const show = useRef(null);
    const focus = useRef(null);
    let err = "*Your list needs a name"

    const handleChange = (e) =>
    {
        setState( 
            {
                name: e.target.value
            }
        )
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        if(state.name === "")
        {
            show.current.style.display = "inline-block";
            focus.current.focus();
            return;
        } 
        else 
        {
            show.current.style.display = "none";
            props.addList(state.name);
            state.name = "";
        }
    }

    return(
        <Card id="newListCard" className="app canvasCards">
            <Card.Body className="cardContent">
            <h1>New List</h1>
                <Form id="newListForm" className="form" onSubmit={handleSubmit}>
                    <div className="groupSection">
                        <FloatingLabel htmlFor="listName" label="List Name">
                        <Form.Control type="text" id="listName" className="inFields" name="name" 
                            placeholder="New List" value={state.name} onChange={handleChange} ref={focus}/>
                        </FloatingLabel>
                        <span ref={show} className="errorMsg" style={{display: "none", color: "red"}}>{err}</span>
                    </div>
                    <Button type="submit" id="newListSubmit" className="buttonScheme"> Add List </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewListForm;