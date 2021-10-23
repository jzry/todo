import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import UserNavi from '../components/UserNavi';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import ToDoList from '../components/ToDoList';

import add from '../addButton.svg'

const CanvasPage = () =>
{
    const curr = new Date();
    const tomorr = new Date();

    tomorr.setDate(curr.getDate() + 3);
    curr.setDate(curr.toISOString().substr(0, 10));
    tomorr.setDate(tomorr.toISOString().substr(0, 10));
    
    const DATA = [
        { id: "todo-0", name: "Eat", completed: true, date: curr },
        { id: "todo-1", name: "Sleep", completed: false, date: tomorr },
        { id: "todo-2", name: "Repeat", completed: false, date: curr }
    ];

    return(
        <div id="canvas" className="pageSolid">
            <UserNavi />
                <PageTitle />
                <LoggedInName />
                <img id="addButton" src={add} alt="addButton" />
                <Container fluid className="cardContainer">
                    <Card className="canvasCards cardItem">
                        <Card.Body>
                            <CardUI />
                        </Card.Body>
                    </Card>
                    <Card className="canvasCards cardItem">
                        <Card.Body>
                            <ToDoList tasks={DATA} />
                        </Card.Body>
                    </Card>
                </Container>
        </div>
    );
}

export default CanvasPage;
