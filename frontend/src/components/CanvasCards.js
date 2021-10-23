import React, { useState } from 'react';
import {Card} from 'react-bootstrap';

import CardUI from '../components/CardUI';
import ToDoList from '../components/ToDoList';

function CanvasCards(props){

    var curr = new Date();

    const DATA = [
        { id: "todo-0", name: "Eat", completed: true, date: curr },
        { id: "todo-1", name: "Sleep", completed: false, date: curr },
        { id: "todo-2", name: "Repeat", completed: false, date: curr }
    ];

    const [cards, card] = useState(props.cards);


    return(
        <div>
            <Card className="canvasCards cardItem">
                <Card.Body>

                </Card.Body>
            </Card>
        </div>
    );

};

export default CanvasCards;