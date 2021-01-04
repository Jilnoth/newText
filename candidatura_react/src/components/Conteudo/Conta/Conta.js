import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import swal from 'sweetalert';
import { Registrar } from '../../api/Api';

class Conta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordconfirm: '',
            validatoremail: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        }
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({
            [name]: value
        });
    }


    addUser() {
        if (this.state.password === '' || this.state.passwordconfirm === '' || this.state.email === '') {
            swal({
                title: "Validação",
                text: "Preencha todos os campos.",
                icon: "error",
                timer: 3000,
                button: false
            })
        } else {
            if (!this.state.validatoremail.test(this.state.email)) {
                swal({
                    title: "Validação",
                    text: "Email invalido.",
                    icon: "error",
                    timer: 3000,
                    button: false
                })
            } else if (this.state.password !== this.state.passwordconfirm) {
                swal({
                    title: "Validação",
                    text: "As senhas são diferentes.",
                    icon: "error",
                    timer: 3000,
                    button: false
                })
            } else if (this.state.password.length < 4) {
                swal({
                    title: "Validação",
                    text: "A senha deve ter no minimo 4 digitos.",
                    icon: "error",
                    timer: 3000,
                    button: false
                })

            } else {
                let User = {
                    username: this.state.email,
                    email: this.state.email,
                    password: this.state.password,
                }
                Registrar(User, "users")
                    .then(res => {
                        if (res.data) {
                            swal({
                                title: "Validação",
                                text: res.message,
                                icon: "success",
                                timer: 3000,
                                button: false
                            })
                            localStorage.setItem('user', res.data)
                            //redirecionar para o formulario de candidatura com o id da bolsa e do user
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

    }

    render() {
        return (
            <React.Fragment>
                <Head />

                <main id="main">

                    <section class="counts section-bg">
                        <div class="container">
                            <div class="section-title">
                                <h2>Minha Conta  </h2>
                            </div>
                        </div>
                    </section>{/*<!-- End Counts Section -->*/}

                    {/* <!-- ======= Contact Us Section ======= -->*/}
                    <section id="contact" class="contact">
                        <div class="container">

                            <div class="row">

                                <div class="col-lg-4 d-flex align-items-stretch">
                                    <div class="info-box">
                                        <span class="fa fa-poll-people"></span>

                                        <h5><strong>Nome</strong> </h5>
                                        <p>{'{pessoa.nome}'}</p>

                                        <h5><strong>Email</strong> </h5>
                                        <p>{'{user}'}<br /></p>
                                    </div>
                                </div>

                                <div class="col-lg-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                    <div class="info-box ">
                                        <span class="fa fa-phone"></span>
                                        <h5><strong>Contactos</strong> </h5>
                                        <p>{'{pessoa.telefone_principal}'}<br />{'{pessoa.telefone_alternativo}'}</p>
                                    </div>
                                </div>

                                <div class="col-lg-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                    <div class="info-box">
                                        <span class="fa fa-envelope"></span>
                                        <h5><strong>Notificações</strong> </h5>
                                    </div>
                                </div>

                                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                                    <h5><strong>Mudar Palavra Passe</strong> </h5>
                                    <div class="text-left"><a href="./trocar_senha.html" class="btn btn-outline-primary col-lg-6">Trocar de Senha</a>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>{/*<!-- End Contact Us Section -->*/}

                </main>{/*<!-- End #main -->*/}


                <Footer />
            </React.Fragment >

        )
    }
}

export default withRouter(Conta);