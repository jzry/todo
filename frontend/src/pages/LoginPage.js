import React from 'react';
import Card from 'react-bootstrap/Card';

import Navigation from '../components/Navigation';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

function LoginPage() 
{
    return (
        <div className="pageSolid">
            <Navigation />
            <Card id="formCard">
                <Card.Body>
                    <PageTitle />
                    <Login />
                </Card.Body>
            </Card>
        </div>
    );
}

export default LoginPage;
