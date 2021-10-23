import React from 'react';
import { Button } from 'react-bootstrap';

function FilterButtons(props)
{
    return(

        <Button type="button" className="buttonScheme toggle-btn filter md-3" 
            aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
                {props.name}
            <span className="visually-hidden">Show </span>
            <span className="visually-hidden"> tasks</span>
        </Button>

    );
};
export default FilterButtons;