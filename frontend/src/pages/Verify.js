import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Card } from 'react-bootstrap';
import axios from 'axios';

import bp from "../components/Path.js";

function verifyEmail(token) {
    return new Promise((resolve, reject) => {
        const config = {
            method: "get",
            url: bp.buildPath(`api/users/verify?q=${token}`),
            headers: {
                "Content-Type": "application/json"
            },
        };

        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.error) {
                    reject(data.error);
                    return;
                }
                
                resolve(data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response.data?.error);
                    return;
                }
            });
    });
}

export default function Verify() {

    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(<></>);

    const { verify_tok } = useParams();

    useEffect(() => {
        verifyEmail(verify_tok)
        .then(msg => {
            if (!msg)
                setRedirect(<Redirect to="/" />);
            setMessage(msg);
        })
        .catch(error => {
            setMessage(error);
        });
    }, []);

    return (
        <Card>
            <Card.Body>
                <div>{message}{redirect}</div>
            </Card.Body>
        </Card>
    );
};