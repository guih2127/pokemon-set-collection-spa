import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.js';
import 'antd/dist/antd.min.js';

import CollectionPage from './pages/CollectionPage';
import LoginPage from './pages/LoginPage'

const App = () =>{
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/Login" />
                </Route>
                <Route path="/Login">
                    <Login />
                </Route>
                <Route path="/Logout">
                    <Logout />
                </Route>
                <Route path="/Collection">
                    <Collection />
                </Route>
            </Switch>
        </Router>
    )
};

function Logout() {
    localStorage.removeItem("token");
    return <LoginPage/>
}

function Login() {
    return <LoginPage />
;}

function Collection() {
    return <CollectionPage />
}

export default App;