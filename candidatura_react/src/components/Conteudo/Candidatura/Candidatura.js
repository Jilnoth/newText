import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import swal from 'sweetalert';
import { Registrar } from '../../api/Api';

class Candidatura extends Component {
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

                <section id="contact" className="contact">



                    <section className="counts section-bg">
                        <div className="container">
                            <div className="section-title">
                                <h2> <strong> Candidato - {'{pessoa.nome}'} </strong></h2>
                            </div>
                        </div>
                    </section>{/*<!-- End Counts Section -->*/}



                    <div className="col-sm-12" style={{background: '#fff', padding: '0px 20px 0px 50px', zoom: '90%' }}>

                        <div className="block "
                            style={{background: '#fff', boxShadow: '0px 0px 0px #111', padding: '30px', width:' 100%', marginLeft: '0px'}}>
                            <div id="advanced-first" className="step">
                                {/*<!-- Step Info -->*/}
                                <div style={{width: '100%',  borderBottom: '1px solid #ccc', margin: '20px 0px'}}>
                                    <h5> <strong> Dados de Pessoais </strong> </h5>
                                </div>

                                <div className="row" id="mydiv_pessoa" style={{marginBottom: '50px'}}>

                                    <div className="col-md-4 form-group">
                                        <label for="personBiName">Nome </label><br />
                                        <strong> </strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Província</label><br />
                                        <strong> </strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Naturalidade </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label>Data de Nascimento</label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Sexo </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label>Estado civil </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label>Nº do BI </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label for="sel1">Data de Emissão</label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Data de Expiração</label><br />
                                        <strong>
                                        </strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label > Provincia de Residência</label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Municipio de Residência </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Bairro Rua Casa </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Nome do Banco </label><br />
                                        <strong></strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label >Nº da Conta Bancaria </label><br /> <strong></strong>

                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label>IBAN </label><br /> <strong> </strong>
                                    </div>

                                    <div className="col-md-2 form-group">
                                        <label> Contacto </label> <br /> <strong>  </strong>
                                    </div>
                                </div>

                                <div style={{width: '100%',  borderBottom: '1px solid #ccc', margin: '30px 0px'}}>
                                    <h5> <strong> Dados de Conclusão da formação </strong> </h5>
                                </div>

                                <div className="block full" className="cargos">
                                    <table id="example-datatable" className="table table-vcenter table-striped table-condensed table-bordered">

                                        <thead>
                                            <tr className="table-primary">
                                                <th scope="col">Instituição</th>
                                                <th scope="col">Curso</th>
                                                <th scope="col">Ingresso</th>
                                                <th scope="col">Conclusão</th>
                                                <th scope="col">Nivel Académico</th>
                                                <th scope="col">Média</th>
                                                <th scope="col">criado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div style={{width: '100%',  borderBottom: '1px solid #ccc', margin:' 30px 0px'}}>
                                    <h5> <strong> Dados da Candidatura</strong> </h5>
                                </div>

                                <div className="block full" className="cargos">
                                    <table id="example-datatable" className="table table-vcenter table-striped table-condensed table-bordered">
                                        <thead>
                                            <tr className="table-primary">
                                                <th scope="col">Bolsa</th>
                                                <th scope="col">Curso </th>
                                                <th scope="col">Instituição </th>

                                                <th scope="col">criado</th>
                                                <th scope="col">Acção</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td><a className="btn btn-primary"><span className="fa fa-edit"></span> Editar</a>
                                                    <button className="btn btn-success"><span className="fa fa-print" ></span> Imprimir</button>
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>
                                </div>


                                <div style={{ width: '100%', borderBottom: '1px solid #ccc', margin: '30px 0px' }}>
                                    <h5> <strong> Anexos Carregados </strong> </h5>

                                </div>


                                <div className="block full" className="cargos">


                                    <table id="example-datatable" className="table table-vcenter table-striped table-condensed table-bordered">

                                        <thead>
                                            <tr className="table-primary">
                                                <th scope="col">Descrição </th>
                                                <th scope="col">Nome do Ficheiro </th>
                                                <th scope="col">Estado </th>
                                                <th scope="col">Acção </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> </td>
                                                <td> </td>

                                                <td> <span className="fa fa-check"> </span> </td>
                                                <td> <button className="btn btn-success"><span className="fa fa-print" ></span> Imprimir</button></td>
                                            </tr>
                                        </tbody>

                                    </table>
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

export default withRouter(Candidatura);