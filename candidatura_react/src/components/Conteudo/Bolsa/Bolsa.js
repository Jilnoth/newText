import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import { BuscarTodos } from '../../api/Api';

class Bolsa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bolsas: []
        }

    }


    componentDidMount() {
        this.fetchBolsas();
    }

    fetchBolsas() {
        BuscarTodos('bolsas')
            .then(res => {
                this.setState({ bolsas: res.data })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Head />

                <main id="main">


                    <section className="counts section-bg">
                        <div className="container">
                            <div className="section-title">
                                <h2>Passo a passo para candidatar  </h2>
                            </div>
                            <div className="row">

                                <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up">
                                    <div className="count-box">
                                        <p>Criar Conta <br /> </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="200">
                                    <div className="count-box">
                                        <p>Efetuar Login </p>

                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="400">
                                    <div className="count-box">
                                        <p>Escolher a Bolsa  </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="600">
                                    <div className="count-box">
                                        <p>Preencher Formulário</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>{/*<!-- End Counts Section -->*/}

                    {/*<!-- ======= Services Section ======= -->*/}
                    <section id="services" className="services">
                        <div className="container">

                            <div className="section-title">
                                <h2>Bolsas </h2>
                            </div>

                            <div className="row">
                                {
                                    this.state.bolsas.map(bolsa => {
                                        return (
                                            <div style={{ cursor: 'pointer' }} className="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                                                <div className="icon">
                                                    <a onClick={() => this.props.history.push("/bolsadetalhe", {bolsaid: bolsa.id })} ><i className="fa fa-television"></i></a>
                                                </div>
                                                <h4 className="title">
                                                    <a onClick={() => this.props.history.push("/bolsadetalhe", {bolsaid: bolsa.id })}>{bolsa.nome}</a>
                                                </h4>
                                                <p className="description">{bolsa.nome}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </section>{/*<!-- End Services Section -->*/}

                </main>{/*<!-- End #main -->*/}



                <Footer />
            </React.Fragment >

        )
    }
}

export default withRouter(Bolsa);