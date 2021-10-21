import React from 'react';
import Card from 'react-bootstrap/Card';
import Navigation from '../components/Navigation';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{
        return(
            <div className="page">
                <Navigation />
                <Card id="formCard">
                    <Card.Body>     
                        <PageTitle />
                        <Login />
                    </Card.Body>
                </Card>
            </div>
        );
};

export default LoginPage;
