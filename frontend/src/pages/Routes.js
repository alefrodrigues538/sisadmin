import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
//NAVBAR
import Navbar from '../components/navbar';

//PAGES
import Home from './Home';

export default function App() {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div>
                <Router>
                    <Switch>
                        <Route path="/">
                            <Home />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}