import React from 'react';
import Card from 'react-bootstrap/Card';
import PageTitle from '../components/PageTitle';
import SignUp from "../components/SignUp";

function SignUpPage()
{
    return(
        <div>
            <Card id="formCard">
                <Card.Body>
                    <PageTitle />
                    <SignUp />
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUpPage;