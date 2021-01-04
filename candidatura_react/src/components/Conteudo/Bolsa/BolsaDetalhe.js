import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import { BuscarPorId } from '../../api/Api';

class BolsaDetalhe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bolsa: ''
        }

    }


    componentDidMount() {
        this.fetchBolsa();
    }

    fetchBolsa() {
        BuscarPorId(this.props.location.state.bolsaid,'bolsas')
            .then(res => {
                this.setState({ bolsa: res.data })
            })
    }
  

    render() {
        return (
            <React.Fragment>
                <Head />


                <main id="main">

                <section id="portfolio" className="portfolio section-bg" style={{height: '160px'}}>
    <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="section-title">
            <h2> <strong> Candidata-se a Bolsa de Estudo</strong></h2>
        </div>
    </div>
    </section>

{/*<!-- End Our Portfolio Section -->
<!-- ======= About Us Section ======= -->*/}
<section id="about" className="about">
    <div className="container">

        <div className="row no-gutters">
            <div className="col-lg-6 video-box">
                <img src="../img/about.jpg" className="img-fluid" style={{width: '600px' , height: '500px'}} alt=""/>
                <a href={this.state.bolsa.video} className="venobox play-btn mb-4" data-vbtype="video"
                    data-autoplay="true"></a>
            </div>

            <div className="col-lg-6 d-flex flex-column justify-content-center about-content">

                <div className="section-title">
                    <h2> </h2>
                    <div className="col-xs-8 text-center">
                        <button  onClick={() => this.props.history.push("/formcandidatura", {bolsaid: this.state.bolsa.id })} className="btn btn-group-xs btn-primary" style={{color: '#fff'}}> CLIQUE PARA SE CANDIDATAR </button>
                    </div>
                </div>

                <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                    <div className="icon"><i className="fa fa-fingerprint"></i></div>
                    <h4 className="title"><a href="">Periodo da candidatura </a></h4>
                    <p className="description">Data de Abertura: 01/13/2020 / Data de Encerramento: 03/31/2020</p>
                </div>

                <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                    <div className="icon"><i className="fa fa-gift"></i></div>
                    <h4 className="title"><a href="">OFerta Formativa </a></h4>
                    <p className="description"> Patrocinador: INAGBE / Tipo de Bolsa: Bolsas Externas de Mérito (Mestrado) /
                        Vagas disponíveis: 300
                    </p>
                </div>
                <div className="icon-box" data-aos="fade-up" data-aos-delay="1">
                    <div className="icon"><i className="fa fa-download"></i></div>
                    <h4 className="title"><a >Download do Formulário  </a></h4>
                    <p className="description">  clique no link acima para fazer o download do formulário de candidatura
                         
                    </p>
                </div>

            </div>
        </div>

    </div>
</section>{/*<!-- End About Us Section -->*/}


{/*<!-- ======= Counts Section ======= -->*/}

<section id="services" className="section-bg">
    <div className="container">

        <header className="section-header">
            
            <h4 className="title"><a href="#"><strong> {this.state.bolsa.nome} </strong></a></h4>
            <br/>

            <p><strong> Descrição </strong><br/><br/>
                {this.state.bolsa.descricao}    </p>

            <p> <br/>  <strong>  III – Requisitos: </strong><br/><br/>
                {this.state.bolsa.requisitos}  </p>

            <p><strong> IV – Processo de Selecção </strong><br/><br/>
                {this.state.bolsa.processo_seleccao} 
                </p>

            <p><strong>  V – Documentação necessária: </strong><br/><br/>
                {this.state.bolsa.documentos_necessario} 
            </p>
        </header>

    </div>
    </section>{/*<!-- #services -->*/}
    </main>{/*<!-- End #main -->*/}



                <Footer />
            </React.Fragment >

        )
    }
}

export default withRouter(BolsaDetalhe);