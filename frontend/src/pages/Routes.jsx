import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

//PAGES
import Home from './Home';
import Fornecedores from './Fornecedores';
import AddFornecedor from './AddFornecedor';

export default props => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/fornecedores/add" component={AddFornecedor} />
            <Route path="/fornecedores" component={Fornecedores}/>

            <Redirect from="*" to="/"/>
        </Switch>
    </Router >
)