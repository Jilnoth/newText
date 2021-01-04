import React, { Component } from 'react';

//import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Head from '../../nav/Head';
import Menu from '../../nav/Menuleft';


class Ajuda extends Component {



    render() {

        return (

            <React.Fragment>

                <Head />
                <div className="app-body">
                    <Menu />
                    <main className="main">

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/principal">Principal</Link></li>
                            <li className="breadcrumb-item">Ajúda</li>
                        </ol>
                        <div className="container-fluid">
                            <div className="card sombra">
                                <div className="brand-card-header text-white bg-facebook">
                                    <h4 className="left">Ajúda</h4>
                                </div>
                                <div className="card-body">
                                    <object width="1600" height="650" data="../../pdf/Manual.pdf"
                                    embedded="true"
                                    >
                                    </object>

                                </div>

                                <div className="card-footer">
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </React.Fragment>
        )
    }
}

export default Ajuda;