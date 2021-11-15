import React from 'react';
import Card from 'react-bootstrap/Card';

import ForgotForm from '../components/ForgotForm';

function ForgotPage() 
{
    return (
        <div>
            <Card id="formCard">
                <Card.Body>
                    <ForgotForm />
                </Card.Body>
            </Card>
        </div>
    );
}

export default ForgotPage;