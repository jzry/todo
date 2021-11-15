import React from 'react';
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

function App() 
{
    return (
        <div className="pageSolid">
            <Navigation />
            <Router >
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/signup" exact>
                        <SignUpPage />
                    </Route>
                    <Route path="/forgot" exact>
                        <ForgotPage />
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
                        <CanvasPage />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
