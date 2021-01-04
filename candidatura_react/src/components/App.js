import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Home from './Conteudo/Principal';
import Bolsa from './Conteudo/Bolsa/Bolsa';
import BolsaDetalhe from './Conteudo/Bolsa/BolsaDetalhe';
import CriarConta from './Conteudo/CriarConta/CriarConta';
import FormCandidatura from './Conteudo/Candidatura/FormCandidatura';
import Candidatura from './Conteudo/Candidatura/Candidatura';
import Conta from './Conteudo/Conta/Conta';
import Login from './Conteudo/Login/Login';
import Mensagem from './Conteudo/Ajuda/Mensagem';



const isAuthenticated = () => {
    if (true)
        return true
    else
        return false
}


const PrivateRoute = ({ component: Component, ...res }) => (

    <Route {...res} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />

);



class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <PrivateRoute path="/" exact component={Home} />
                    {/*  Modulo sala   */}
                    <PrivateRoute path="/bolsas" exact component={Bolsa} />
                    <PrivateRoute path="/bolsadetalhe" exact component={BolsaDetalhe} />

                    <PrivateRoute path="/criarconta" exact component={CriarConta} />
                    <PrivateRoute path="/formcandidatura" exact component={FormCandidatura} />
                    <PrivateRoute path="/minhacandidatura" exact component={Candidatura} />
                    <PrivateRoute path="/conta" exact component={Conta} />
                    <PrivateRoute path="/login" exact component={Login} />

                    {/*  --------------------- */}
                    <PrivateRoute path="*" component={() => "direção url não encontrada. 404 NOT FOUND"} />
                    <PrivateRoute path="/mensagem" exact component={Mensagem} />
                </Switch>
            </>
        )
    }
}

export default App;