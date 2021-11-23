import React from 'react';
import Card from 'react-bootstrap/Card';

import ForgotForm from '../components/ForgotForm';

function ForgotPage() 
{
    return (
        <div>
            <Card id="formCard">
                <Card.Body className="app">
                    <h1>Reset your password</h1>
                    <p>We'll send you an email so that you can reset your password.</p>
                    <ForgotForm />
                </Card.Body>
            </Card>
        </div>
    );
}

export default ForgotPage;