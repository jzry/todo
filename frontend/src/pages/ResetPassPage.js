import React from 'react';
import Card from 'react-bootstrap/Card';

import UpdatePassForm from '../components/UpdatePassForm';

function ResetPassPage() 
{
    return (
        <div>
            <Card id="formCard">
                <Card.Body>
                    <UpdatePassForm/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ResetPassPage;