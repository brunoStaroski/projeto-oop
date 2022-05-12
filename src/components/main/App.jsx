import React from "react";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Routes from "./Routes";
import './App.css';
import Nav from '../template/Nav'

export default props =>
    <BrowserRouter>
        <div className={'app'}>
            <Nav />
            <Routes />
        </div>
    </BrowserRouter>
