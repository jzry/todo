import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const DeleteConfirmation = (props) =>
{
    function choice(e){
        e.preventDefault();
        props.handleDelete(e.target.value, props.id);
    }

    return(
        <Card.Body>
            <p>Are you sure you would like to delete?</p>
            <Form>
                <Button value={true} onClick={choice}>Yes</Button>
                <Button value={false} onClick={choice}>No</Button>
            </Form>
        </Card.Body>
    );
}

export default DeleteConfirmation;