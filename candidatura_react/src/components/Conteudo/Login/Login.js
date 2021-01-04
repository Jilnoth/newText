import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import swal from 'sweetalert';
import { Login } from '../../api/Api';

class CriarConta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',


        };
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({
            [name]: value
        });
    }

    loginUser() {

        if (this.state.password === '' || this.state.username === '') {
            swal({
                title: "Validação",
                text: "Preencha todos os campos.",
                icon: "error",
                timer: 3000,
                button: false
            })
        } else {
            Login(this.state)
                .then(async res => {
                    if (res.data) {

                        //redirecionar no home
                        await localStorage.setItem('usertoken', res.data.token)
                        await localStorage.setItem('userid', res.data.id)
                        await localStorage.setItem('username', res.data.username)
                        await this.props.history.push('/')
                    } else {
                        swal({
                            title: "Validação",
                            text: res.message,
                            icon: "error",
                            timer: 3000,
                            button: false
                        })
                    }

                })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Head />



                <section id="contact" class="contact">
                    <div class="section-title">
                        <h2>Entrar</h2>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3" data-aos="fade-up" data-aos-delay="300"></div>
                            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                                <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                                    <div class="form-row">
                                        <div class="col-lg-12 form-group text-left">
                                            <label>Email</label>
                                            <input type="email" name="username" onChange={this.handleChange} class="form-control"
                                                placeholder="Digita o email " data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        </div>

                                    </div>
                                    <div class="form-row">
                                        <div class="col-lg-12 form-group text-left">
                                            <label>Palavra Passe</label>
                                            <input type="password" name="password" onChange={this.handleChange} class="form-control"
                                                placeholder="Digita a senha  " data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        </div>

                                    </div>
                                    <div class="form-row">

                                        <div class="col-lg-10 text-left">
                                            <button type="button" onClick={this.loginUser} class="btn btn-primary">Entrar</button>
                                        </div>

                                        <div class="col-lg-1 text-left">
                                            <Link to="/criarconta" class="btn btn-success ">Cadastrar</Link>
                                        </div>
                                    </div>

                                    <br />
                                    <a href="./receber_email.html" style={{ textDecoration: 'none', cursor: 'pointer' }} class="primary">recuperar
              senha</a>
                                    <br />

                                </form>
                            </div>
                        </div>

                    </div>

                </section>

                <Footer />
            </React.Fragment >

        )
    }
}

export default withRouter(CriarConta);