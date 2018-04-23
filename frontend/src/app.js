import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import Container from './components/container.js';



const app = document.getElementById('app');

ReactDOM.render((
    <BrowserRouter>
        <Container />
    </BrowserRouter>), app);