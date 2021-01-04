import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../nav/Head';
import Footer from '../nav/Footer';

import { BuscarTodos } from '../api/Api';

class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    fetchUsuario() {
        BuscarTodos("usuario")
            .then(data => {
                this.setState({ usuarios: data });
            });
    }


    render() {
        return (
            <React.Fragment>
                <Head />
                <section className="">
                    {/* slidshow */}

                    <section id="hero" style={{ height: '450px' }} >
                        <div class="hero-container">
                            <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel" style={{ marginTop: '-100px' }}>
                                <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>
                                <div class="carousel-inner" role="listbox">
                                    {/*<!-- Slide 1-->*/}
                                    <div class="carousel-item active slide-img1" >
                                        <div class="carousel-container">
                                            <div class="carousel-content container">
                                                <h2 class="animated fadeInDown">PORTAL DE CANDIDATURAS</h2>
                                                <p class="animated fadeInUp">O Instituto Nacional de Gestão de Bolsas de Estudo fornece bolsas internas e externas para licenciatura, mestrado e
                                                doutoramento, tendo todas requisitos diferentes. Nem todas as bolsas estarão disponíveis ao mesmo tempo,
                                    portanto confirme sempre visitando a página inicial.  </p>
                                                <a href="./passos_candidatura.html" class="btn-get-started animated fadeInUp scrollto">CANDIDATAR-ME</a>
                                                <a href="./login.html" class="btn-get-started animated fadeInUp scrollto">Login</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/*<!-- Slide 2  -->*/}
                                    <div class="carousel-item slide-img2" >
                                        <div class="carousel-container">
                                            <div class="carousel-content container">
                                                <h2 class="animated fadeInDown"> <span> COMO CANDIDATAR-ME ?</span></h2>
                                                <p class="animated fadeInUp">O INAGBE fornece bolsas internas e externas para licenciatura, mestrado e
                                                doutoramento, tendo todas requisitos diferentes. Nem todas as bolsas estarão disponíveis ao mesmo tempo,
                                    portanto confirme sempre visitando a página inicial. </p>
                                                <a href="./passos_candidatura.html" class="btn-get-started animated fadeInUp scrollto">CANDIDATAR-ME</a>
                                                <a href="./login.html" class="btn-get-started animated fadeInUp scrollto">Login</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon icofont-rounded-left" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon icofont-rounded-right" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </section>




                    {/*  corpo */}

                    <main id="main">
        <section class="counts section-bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up">
                        <div class="count-box">
                            <span data-toggle="counter-up">0</span>
                            <p>Bolsas Interna de <br/> Graduação</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="count-box">
                            <span data-toggle="counter-up">0</span>
                            <p>Bolsas Internas Pós-Graduação</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="400">
                        <div class="count-box">
                            <span data-toggle="counter-up">9</span>
                            <p>Bolsas Externas de Graduação </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay="600">
                        <div class="count-box">
                            <span data-toggle="counter-up">300</span>
                            <p>Bolsas Externas de Pos-graduação</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*<!--bolsas-->*/}
        <section id="services" class="services">
        <div class="container">
        <div class="section-title">
            <h2>Bolsas </h2>
        </div>

{/* essa dive de bolsas vem da bd, vefiricar depois */}
        <div class="row">
            <div style={{cursor: 'pointer'}} 
                class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                <div class="icon"><a href="./bolsa_detalhes.html"><i class="fa fa-television"></i></a></div>
                <h4 class="title"><a href="./bolsa_detalhes.html">{'Bolsa Licenciatura'}</a></h4>
                <p class="description">{'licenciatura para portugal'}</p>
            </div>
            <div style={{cursor: 'pointer'}} 
                class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                <div class="icon"><a href="./bolsa_detalhes.html"><i class="fa fa-television"></i></a></div>
                <h4 class="title"><a href="./bolsa_detalhes.html">{'Bolsa Mestrato'}</a></h4>
                <p class="description">{'mestrado em China'}</p>
            </div> {/*<!--Pedro esta dive aparece apenas se o usuario estiver logado-->*/}
        </div>

        </div>
        </section>
       {/* <!--resultados-->*/}
         <section class="counts section-bg">
            <div class="container">

                <div class="section-title">
                <h2>Resultados</h2>
                </div>
   
            </div>
        </section>
    </main>



                </section>
                <Footer />
            </React.Fragment >

        )
    }
}

export default withRouter(Principal);