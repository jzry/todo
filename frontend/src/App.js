import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CanvasPage from './pages/CanvasPage';
import ProductPage from './pages/ProductPage';
import CompanyPage from './pages/CompanyPage';
import Pricing from './pages/Pricing';
import ForgotPage from './pages/ForgotPage';
import Navigation from './components/Navigation';
import ResetPassPage from './pages/ResetPassPage';

function App() 
{
    const [user, setUser] = useState(
        {
            id: null,
            firstName: "",
            lastName: ""
        }
    );

    // true == active user (logged in)
    const [state, setState] = useState(user.id ? true : false);

    // Set user vars to access the Canvas page
    function onLogin(active)
    {
        setState(active);

        let check = JSON.parse(localStorage.getItem('user_data'));

        setUser(
            {
                id: check.id,
                firstName: check.firstName, 
                lastName: check.lastName
            }
        );

        return <Redirect to="/canvas"/>
    }

    // clear all fields on logout
    function onLogout(active)
    {
        setState(active);
        setUser(
            {        
                id: null,
                firstName: "",
                lastName: ""
            }
        );
        return <Redirect to="/" />
    }

    return (
        <div className="pageSolid">
            <Navigation active={state} onLogout={onLogout}/>
            <Router >
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path="/login" exact>
                        {state ? <Redirect to="/" /> : <LoginPage onLogin={onLogin}/>}
                    </Route>
                    <Route path="/signup" exact>
                        {state ? <Redirect to="/" /> : <SignUpPage />}
                    </Route>
                    <Route path="/forgot" exact>
                        <ForgotPage />
                    </Route>
                    <Route path="/resetpw">
                        <ResetPassPage />
                    </Route>
                    <Route path="/product">
                        <ProductPage />
                    </Route>
                    <Route path="/company" exact>
                        <CompanyPage />
                    </Route>
                    <Route path="/pricing" exact>
                        <Pricing />
                    </Route>
                    <Route path="/canvas" exact>
                        {state ? <CanvasPage user={user}/> : <Redirect to="/" />}
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
