import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import swal from 'sweetalert';
import { Registrar } from '../../api/Api';

class CriarConta extends Component {
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
                    .then(async res => {
                        if (res.data) {
                            swal({
                                title: "Validação",
                                text: res.message,
                                icon: "success",
                                timer: 3000,
                                button: false
                            })
                            await localStorage.setItem('usertoken', res.data.token)
                            await localStorage.setItem('userid', res.data.id)
                            await localStorage.setItem('username', res.data.username)
                            //redirecionar para o home
                            await this.props.history.push('/')
                        } else if(res.data===null) {
                            swal({
                                title: "Validação",
                                text: res.message,
                                icon: "error",
                                timer: 3000,
                                button: false
                            })
                        }else{
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

                <section id="contact" class="contact">
                    <div class="section-title">
                        <h2>Criar Conta</h2>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3" data-aos="fade-up" data-aos-delay="300"></div>
                            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">

                                <div class="form-row col-lg-12 form-group text-left">
                                    <input type="email" name="email" onChange={this.handleChange} class="form-control" placeholder="E-mail" />
                                </div>
                                <div class="form-row col-lg-12 form-group text-left">
                                    <div class="col-lg-6">
                                        <input type="password" name="password" onChange={this.handleChange} class="form-control" placeholder="Palavra-passe" />
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="password" name="passwordconfirm" onChange={this.handleChange} class="form-control" placeholder="Confirmar Palavra-passe" />
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-primary" onClick={this.addUser} type="button"> Submeter</button>
                                </div>
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