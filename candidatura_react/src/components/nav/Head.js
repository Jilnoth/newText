import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import swal from "sweetalert";


import $ from 'jquery';


let foto = ""
class Head extends Component {
  constructor(props) {
    super(props);

    this.state = {

username:null
    };

  }

componentDidMount(){
  if(localStorage.username){
    this.setState({username:localStorage.username})
  }
}

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('user')
    this.props.history.push('/')
  }

  render() {

    return (

      <header className="">
        {/*<!--creditos-->*/}
        <section id="topbar" className="d-none d-lg-block credito-img"  >
          <div className="container clearfix">
            <div className="contact-info float-left">
              <span className="fa fa-user credito-color" ></span> <a href="#" className="credito-color" > {this.state.username || ''}</a>
            </div>
            <div className="social-links float-right">
              <a href="https://twitter.com/inagbe_angola" target="_blank" className="twitter"><span className="fa fa-twitter credito-color" ></span></a>
              <a href="https://www.facebook.com/inagbe.angola" target="_blank" className="facebook"><span className="fa fa-facebook credito-color" ></span></a>
              <a href="https://www.instagram.com/inagbe" target="_blank" className="instagram"><span className="fa fa-instagram credito-color" ></span></a>
              <a href="https://www.youtube.com/inagbe_angola" target="_blank" className="youtube  credito-color" ><span className="fa fa-youtube credito-color" ></span></a>
            </div>
          </div>
        </section>

        {/*<!--menu-->*/}
        <div id="header">
          <nav className="navbar navbar-light navbar-expand-sm navbar-default">
            <div className="container">
              <Link className="navbar-brand mr-auto" href="https://inagbeangola.com"><strong>INAGBE</strong></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-lg-end" id="Navbar">
                <ul className="navbar-nav">
                  <li className="nav-item active"><Link to="/" className="nav-link" >Inicio</Link></li>
                  <li className="nav-item"><a className="nav-link" href="https://inagbeangola.com">Portal</a></li>
                  <li className="nav-item"><Link to="/bolsas" className="nav-link" href="./bolsas.html">Bolsas</Link></li>
                  <li className="nav-item"><Link to="/criarconta" className="nav-link" href="./criar_conta.html">Criar conta</Link></li>
                  <li className="nav-item"><Link to="/minhacandidatura" className="nav-link" href="./candidatura_detalhes.html">Minha Candidatura</Link></li>
                  <li className="nav-item"><Link to="/conta" className="nav-link" href="./perfil.html">Conta</Link></li>
                  <li className="nav-item"><Link to="/login" className="nav-link" href="./login.html"><span className="fa fa-sign-in"></span> Login</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header >

    )
  }
}

export default withRouter(Head);