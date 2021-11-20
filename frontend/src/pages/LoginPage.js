import React from 'react';
import Card from 'react-bootstrap/Card';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

function LoginPage(props) 
{
    return (
        <div>
            <Card id="formCard">
                <Card.Body>
                    <PageTitle />
                    <Login onLogin={props.onLogin} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default LoginPage;
