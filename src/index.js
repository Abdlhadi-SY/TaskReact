import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import MenuContext from './Contexts/MenuContext';
import UserContext from "./Contexts/UserContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <MenuContext>
        <UserContext>
            <App/>
        </UserContext>
        </MenuContext>
        </BrowserRouter>
    </React.StrictMode>
    );


reportWebVitals();
