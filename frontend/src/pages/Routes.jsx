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

import Produtos from './Produtos'
import AddProduto from './AddProduto'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/fornecedores/add" component={AddFornecedor} />
                <Route path="/fornecedores" component={Fornecedores} />
                <Route path="/produtos/add" component={AddProduto} />
                <Route path="/produtos" component={Produtos} />

                <Redirect from="*" to="/" />
            </Switch>
        </Router >
    );
}