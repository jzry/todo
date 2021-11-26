import React from 'react';
import Card from 'react-bootstrap/Card';

import ResetPassForm from '../components/ResetPassForm';

function ResetPassPage() 
{
    return (
        <div>
            <Card id="formCard">
                <Card.Body>
                    <ResetPassForm/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ResetPassPage;