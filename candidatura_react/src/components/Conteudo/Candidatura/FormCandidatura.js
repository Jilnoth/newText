import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';
import Select from 'react-select'
import $ from 'jquery';

import Head from '../../nav/Head';
import Footer from '../../nav/Footer';

import swal from 'sweetalert';
import {
    Add_UpdatePessoa,
    Add_UpdateFormacao,
    BuscarTodos,
    BuscarPorId,
    BuscarMunicipioIdProvincia,
    BuscarProvinciaIdPais,
    BuscarPessoaIdUser,
    BuscarInstituicaoIdProvincia,
    BuscarAnexo,
    Constantes
} from '../../api/Api';

let uploadedFiles = [];
class FormCandidatura extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bolsa: '',


            /* secção para os opcion dos select */
            optionsGenero: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsEstadoCivil: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsProvincia: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsNaturalidade: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsPaisResidencia: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsProvinciaResidencia: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsMunicipioResidencia: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsPaisFormacao: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsProvinciaFormacao: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsNivelAcademico: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsInstituicao: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsCurso: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsPaisActivos: [
                { value: 'carregando...', label: 'carregando...' },
            ],

            optionsProvinciasCandidaturas: [
                { value: 'carregando...', label: 'carregando...' },
            ],


            /* Option para data */
            optionsDia: [],
            optionsMes: [
                { value: '01', label: 'JANEIRO' },
                { value: '02', label: 'FEVEREIRO' },
                { value: '03', label: 'MARÇO' },
                { value: '04', label: 'ABRIL' },
                { value: '05', label: 'MAIO' },
                { value: '06', label: 'JUNHO' },
                { value: '07', label: 'JULHO' },
                { value: '08', label: 'AGOSTO' },
                { value: '09', label: 'SETEMBRO' },
                { value: '10', label: 'OUTUBRO' },
                { value: '11', label: 'NOVEMBRO' },
                { value: '12', label: 'DEZEMBRO' },

            ],
            optionsAno: [],

            dianascimento: '',
            mesnascimento: '',
            anonascimento: '',
            diaemissao: '',
            mesemissao: '',
            anoemissao: '',


            /* dados da etapa 1, dados pessoais */
            idpessoa: null,
            nome: '',
            user_id: null,
            data_nascimento: '',
            estado_civil: '',
            base_municipio_id: '',
            genero: '',
            ndi: '',
            dtEmissao: '',
            endereco: '',
            municipio_residencia_id: '',
            banco: '',
            conta_bancaria: '',
            iban: '',
            telefone_principal: '',
            telefone_alternativo: '',
            contactos: [],
            formacoes: [],


            /* dados da etapa 2, dados da formação anterior */
            idformcacao: null,
            base_pessoa_id: null,
            edu_instituicao_id: null,
            base_curso_id: null,
            media: '',
            ano_ingresso: '',
            ano_conclusao: '',
            nivel_academico: '',

            idprovincia_instituicao: '',
            provinciaformacao: '',
            paisformacao: '',


            /* dados da etapa 3, dados de anexo */
            anexos: [],
            uploadedFiles: [],


            bolsaid: null,

            municipio: '',
            provincia_documento_id: '',
            tipo_identificacao: '',
            municipio_residencia: '',

            candidaturas: [],
            anexos_itens: [],
            anexo: '',
            base_anexo_id: '',
            user: '',

        }
        this.addCandidatura = this.addCandidatura.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SelecionarGenero = this.SelecionarGenero.bind(this);
        this.SelecionarEstadoCivil = this.SelecionarEstadoCivil.bind(this);
        this.buscarMunicipio = this.buscarMunicipio.bind(this);
        this.SelecionarMunicipio = this.SelecionarMunicipio.bind(this);
        this.buscarProvincia = this.buscarProvincia.bind(this);
        this.buscarMunicipioResidencia = this.buscarMunicipioResidencia.bind(this);
        this.SelecionarMunicipioResidencia = this.SelecionarMunicipioResidencia.bind(this);

        this.SelecionarDiaNascimento = this.SelecionarDiaNascimento.bind(this);
        this.SelecionarMesNascimento = this.SelecionarMesNascimento.bind(this);
        this.SelecionarAnoNascimento = this.SelecionarAnoNascimento.bind(this);

        this.SelecionarDiaEmissao = this.SelecionarDiaEmissao.bind(this);
        this.SelecionarMesEmissao = this.SelecionarMesEmissao.bind(this);
        this.SelecionarAnoEmissao = this.SelecionarAnoEmissao.bind(this);

        this.buscarProvinciaFormacao = this.buscarProvinciaFormacao.bind(this);
        this.buscarNIvelAcademico = this.buscarNIvelAcademico.bind(this);
        this.buscarInstituicao = this.buscarInstituicao.bind(this);
        this.SelecionarInstituicao = this.SelecionarInstituicao.bind(this);
        this.SelecionarCurso = this.SelecionarCurso.bind(this);

        this.buscarProvinciaCandidatura = this.buscarProvinciaCandidatura.bind(this)

        this.fileChange = this.fileChange.bind(this);
        this.upload = this.upload.bind(this);
        this.salvarpdf = this.salvarpdf.bind(this);





    }

    componentDidMount() {
        this.fetchPessoa();
        this.fetchBolsa();
        this.fetchOption();
        console.log(this.props.location.state.bolsaid)
        if (this.props.location.state.bolsaid) {
            this.setState({ bolsaid: this.props.location.state.bolsaid })
        }
        if (localStorage.userid) {
            this.setState({ user_id: localStorage.userid })
        }
    }
    fetchPessoa() {
        BuscarPessoaIdUser(localStorage.userid)
            .then(res => {
                if (res.data) {
                    this.setState({
                        idpessoa: res.data.id,
                        base_pessoa_id: res.data.id,
                        nome: res.data.nome,
                        user_id: res.data.user_id,
                        data_nascimento: res.data.data_nascimento,
                        estado_civil: res.data.estado_civil,
                        base_municipio_id: res.data.base_municipio_id,
                        genero: res.data.genero,
                        ndi: res.data.ndi,
                        dtEmissao: res.data.dtEmissao,
                        endereco: res.data.endereco,
                        municipio_residencia_id: res.data.municipio_residencia_id,
                        banco: res.data.banco,
                        conta_bancaria: res.data.conta_bancaria,
                        iban: res.data.iban,
                        telefone_principal: res.data.telefone_principal,
                        telefone_alternativo: res.data.telefone_alternativo,
                        contactos: res.data.contactos,
                        formacoes: res.data.formacoes

                    })
                }
            })
    }

    fetchBolsa() {
        BuscarPorId(this.state.bolsaid, 'bolsas')
            .then(res => {
                this.setState({ bolsa: res.data })
            })
    }

    fetchOption() {
        let generos = []
        Constantes('generos')
            .then(res => {
                res.data.map(g => {
                    generos.push({ value: g.code, label: g.info })
                })
                this.setState({ optionsGenero: generos })
            })

        let estadocivil = []
        Constantes('estados_civis')
            .then(res => {
                res.data.map(ec => {
                    estadocivil.push({ value: ec.code, label: ec.info })
                })
                this.setState({ optionsEstadoCivil: estadocivil })
            })

        let provincias = []
        BuscarTodos('provincias')
            .then(res => {
                res.data.map(prov => {
                    provincias.push({ value: prov.id, label: prov.nome })
                })
                this.setState({ optionsProvincia: provincias })
            })

        let pais = []
        BuscarTodos('paises')
            .then(res => {
                res.data.map(prov => {
                    pais.push({ value: prov.id, label: prov.nome })
                })
                this.setState({ optionsPaisResidencia: pais })
                this.setState({ optionsPaisFormacao: pais })
            })



        let cursos = []
        BuscarTodos('cursosgerais')
            .then(res => {
                res.data.map(curso => {
                    cursos.push({ value: curso.id, label: curso.nome })
                })
                this.setState({ optionsCurso: cursos })
            })


        BuscarAnexo('1')
            .then(res => {
                this.setState({ anexos: res.data })
            })


        let paisesactivos = []
        BuscarTodos('paisesactivo')
            .then(res => {
                res.data.map(pais => {
                    paisesactivos.push({ value: pais.id, label: pais.nome })
                })
                this.setState({ optionsPaisActivos: paisesactivos })
            })


        /* prenchendo os select para data */
        for (let i = 1; i <= 31; i++) {
            this.state.optionsDia.push({ value: i, label: i })
        }
        for (let i = 1976; i <= 2050; i++) {
            this.state.optionsAno.push({ value: i, label: i })
        }

    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({
            [name]: value
        });
    }


    buscarMunicipio(e) {
        let municipio = []
        BuscarMunicipioIdProvincia(e.value)
            .then(res => {
                res.data.map(mun => {
                    municipio.push({ value: mun.id, label: mun.nome })
                })
                this.setState({ optionsNaturalidade: municipio })
            })
    }
    SelecionarMunicipio(e) {
        this.setState({ base_municipio_id: e.value })
    }


    buscarProvincia(e) {
        let provincia = []
        BuscarProvinciaIdPais(e.value)
            .then(res => {
                res.data.map(prov => {
                    provincia.push({ value: prov.id, label: prov.nome })
                })
                this.setState({ optionsProvinciaResidencia: provincia })
            })
    }

    buscarProvinciaFormacao(e) {
        let provincia = []
        BuscarProvinciaIdPais(e.value)
            .then(res => {
                res.data.map(prov => {
                    provincia.push({ value: prov.id, label: prov.nome })
                })
                this.setState({ optionsProvinciaFormacao: provincia })
            })
    }

    buscarProvinciaCandidatura(e) {
        let provincia = []
        BuscarProvinciaIdPais(e.value)
            .then(res => {
                res.data.map(prov => {
                    provincia.push({ value: prov.id, label: prov.nome })
                })
                this.setState({ optionsProvinciasCandidaturas: provincia })
            })
    }

    buscarNIvelAcademico(e) {
        let niveisacademicos = []
        Constantes('niveis_academicos')
            .then(res => {
                res.data.map(na => {
                    niveisacademicos.push({ value: na.code, label: na.info })
                })
                this.setState({ optionsNivelAcademico: niveisacademicos, idprovincia_instituicao: e.value })
            })
        if (this.state.idprovincia_instituicao !== '') {
            let instituicao = []
            BuscarInstituicaoIdProvincia(e.value)
                .then(res => {
                    res.data.map(inst => {
                        instituicao.push({ value: inst.id, label: inst.nome })
                    })
                    this.setState({ optionsInstituicao: instituicao })
                })
        }

    }

    buscarInstituicao(e) {
        console.log(e.value)
        let instituicao = []
        BuscarInstituicaoIdProvincia(this.state.idprovincia_instituicao)
            .then(res => {
                res.data.map(inst => {
                    instituicao.push({ value: inst.id, label: inst.nome })
                })
                this.setState({ optionsInstituicao: instituicao })
            })
        this.setState({ nivel_academico: e.value })
    }
    SelecionarInstituicao(e) {
        this.setState({ edu_instituicao_id: e.value })
    }
    SelecionarCurso(e) {
        this.setState({ base_curso_id: e.value })
    }


    buscarMunicipioResidencia(e) {
        let municipio = []
        BuscarMunicipioIdProvincia(e.value)
            .then(res => {
                res.data.map(mun => {
                    municipio.push({ value: mun.id, label: mun.nome })
                })
                this.setState({ optionsMunicipioResidencia: municipio })
            })
    }
    SelecionarMunicipioResidencia(e) {
        this.setState({ municipio_residencia_id: e.value })
    }

    SelecionarGenero(e) {
        this.setState({ genero: e.value })
    }

    SelecionarEstadoCivil(e) {
        this.setState({ estado_civil: e.value })
    }

    SelecionarDiaNascimento(e) {
        this.setState({ dianascimento: e.value })
    }

    SelecionarMesNascimento(e) {
        this.setState({ mesnascimento: e.value })
    }

    SelecionarAnoNascimento(e) {
        this.setState({ anonascimento: e.value })
        if (this.state.dianascimento < 10) {
            this.setState({ data_nascimento: `${e.value}-${this.state.mesnascimento}-0${this.state.dianascimento}T00:00:00.000Z` })
        } else {
            this.setState({ data_nascimento: `${e.value}-${this.state.mesnascimento}-${this.state.dianascimento}T00:00:00.000Z` })
        }
    }

    SelecionarDiaEmissao(e) {
        this.setState({ diaemissao: e.value })
    }

    SelecionarMesEmissao(e) {
        this.setState({ mesemissao: e.value })
    }

    SelecionarAnoEmissao(e) {
        this.setState({ anoemissao: e.value })
        if (this.state.dianascimento < 10) {
            this.setState({ dtEmissao: `${e.value}-${this.state.mesemissao}-0${this.state.diaemissao}T00:00:00.000Z` })
        } else {
            this.setState({ dtEmissao: `${e.value}-${this.state.mesemissao}-${this.state.diaemissao}T00:00:00.000Z` })
        }
    }




    addCandidatura() {
        let val = false;
        if (this.state.nome === '') {
            $('.nome').css('border', 'solid 2px red')
            val = false
        } else {
            $('.nome').css('border', 'solid 2px green')
            val = true
        }

        if (this.state.data_nascimento === '' || this.state.anonascimento === '' || this.state.mesnascimento === '' || this.state.dianascimento === '') {
            $('.dianascimento').css('border', 'solid 2px red')
            $('.mesnascimento').css('border', 'solid 2px red')
            $('.anonascimento').css('border', 'solid 2px red')
            val = false
        } else {
            $('.dianascimento').css('border', 'solid 2px green')
            $('.mesnascimento').css('border', 'solid 2px green')
            $('.anonascimento').css('border', 'solid 2px green')
            val = true
        }

        if (this.state.ndi === '') {
            $('.ndi').css('border', 'solid 2px red')
            val = false
        } else {
            $('.ndi').css('border', 'solid 2px green')
            val = true
        }

        if (this.state.dtEmissao === '' || this.state.anoemissao === '' || this.state.mesemissao === '' || this.state.diaemissao === '') {
            $('.diaemissao').css('border', 'solid 2px red')
            $('.mesemissao').css('border', 'solid 2px red')
            $('.anoemissao').css('border', 'solid 2px red')
            val = false
        } else {
            $('.diaemissao').css('border', 'solid 2px green')
            $('.mesemissao').css('border', 'solid 2px green')
            $('.anoemissao').css('border', 'solid 2px green')
            val = true
        }

        if (this.state.estado_civil === '') {
            $('.estado_civil').css('border', 'solid 2px red')
            val = false
        } else {
            $('.estado_civil').css('border', 'solid 2px green')
            val = true
        }

        if (this.state.genero === '') {
            $('.genero').css('border', 'solid 2px red')
            val = false
        } else {
            $('.genero').css('border', 'solid 2px green')
            val = true
        }



        if (this.state.base_municipio_id === '') {
            $('.base_municipio_id').css('border', 'solid 2px red')
            val = false
        } else {
            $('.base_municipio_id').css('border', 'solid 2px green')
            val = true
        }


        if (this.state.municipio_residencia_id === '') {
            $('.municipio_residencia_id').css('border', 'solid 2px red')
            val = false
        } else {
            $('.municipio_residencia_id').css('border', 'solid 2px green')
            val = true
        }


        if (this.state.telefone_principal === '') {
            $('.telefone_principal').css('border', 'solid 2px red')
            val = false
        } else {
            $('.telefone_principal').css('border', 'solid 2px green')
            val = true
        }


        if (val) {
            let pessoa = {
                id: this.state.idpessoa,
                nome: this.state.nome,
                user_id: this.state.user_id,
                data_nascimento: this.state.data_nascimento,
                estado_civil: this.state.estado_civil,
                base_municipio_id: this.state.base_municipio_id,
                genero: this.state.genero,
                ndi: this.state.ndi,
                dtEmissao: this.state.dtEmissao,
                endereco: this.state.endereco,
                municipio_residencia_id: this.state.municipio_residencia_id,
                banco: this.state.banco,
                conta_bancaria: this.state.conta_bancaria,
                iban: this.state.iban,
                telefone_principal: this.state.telefone_principal,
                telefone_alternativo: this.state.telefone_alternativo,
                contactos: this.state.contactos,
                formacoes: this.state.formacoes,
            }


            let formacao = {
                id: this.state.idformcacao,
                pessoa_id: '',

                edu_instituicao_id: this.state.edu_instituicao_id,
                base_curso_id: this.state.base_curso_id,
                media: this.state.media,
                ano_ingresso: this.state.ano_ingresso,
                ano_conclusao: this.state.ano_conclusao,
                nivel_academico: this.state.nivel_academico

            }


            Add_UpdatePessoa(pessoa, pessoa.id, pessoa.user_id)
                .then(res => {
                    console.log(res)
                    if (res.data===null) {
                        swal({
                            title: "Erro",
                            text: res.message,
                            icon: "error",
                            timer: 3000,
                            button: false
                          })
                    }else{
                        this.setState({
                            idpessoa: res.data.id,
                            base_pessoa_id: res.data.id,
                            pessoa_id: res.data.id
                        })
                        formacao.pessoa_id = res.data.id;
                    }
                    this.fetchPessoa()
                    console.log(res)
                })
                .then(() => {
                    console.log(formacao)
                    console.log(formacao.pessoa_id)
                    console.log(formacao.id)
                    Add_UpdateFormacao(formacao, formacao.pessoa_id, formacao.id)
                        .then(res => {
                            if (res.data.id) {
                                this.setState({ idformcacao: res.data.id })
                            }
                            this.fetchPessoa()
                            console.log(res)
                        })
                })

        }
    }


    fileChange(element, tipoAnexo) {
        var fileName = element.target.files[0].name;
        uploadedFiles.push({ tipoAnexo: tipoAnexo, files: element.target.files, fileName });
    }


    salvarpdf(element, tipoAnexo) {
        let formData = new FormData();
        var fileName = element.target.files[0].name;

        formData.append(`uploads_${tipoAnexo}`, element.target.files[0], fileName);

        console.log(formData)
    }


    upload(tipoAnexo) {
        const uploadedFiless = tipoAnexo ? uploadedFiles.filter(f => f.tipoAnexo == tipoAnexo) : uploadedFiles;
        let formData = new FormData();
        for (var i = 0; i < uploadedFiless.length; i++) {
            for (var j = 0; j < uploadedFiless[i].files.length; j++) {
                formData.append(`uploads_${uploadedFiless[i].tipoAnexo}[]`, uploadedFiless[i].files[j], uploadedFiless[i].files[j].name);
            }
            console.log(formData)
            console.log(uploadedFiless)

        }

    }


    render() {
        return (
            <React.Fragment>
                <Head />
                <section id="contact" className="contact">

                    <section id="portfolio" className="portfolio section-bg" style={{ height: '160px' }}>
                        <div className="container" data-aos="fade-up" data-aos-delay="100">
                            <div className="section-title">
                                <h2> <strong> Formulario de candidatura</strong></h2>
                            </div>
                        </div>
                    </section>

                    <div className="container-fluid mt-3 mb-3">
                        <div className="row">
                            <div className="col-12">

                                {/*<!--Dados Pessoais-->*/}
                                <form >
                                    <div className="card mt-3 mb-2">
                                        <div className="card-header">
                                            <h4 style={{ color: 'red' }}><strong>Dados Pessoais</strong></h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="col-lg-6">
                                                    <label for="nome">Nome Completo</label>
                                                    <input type="text" onChange={this.handleChange} value={this.state.nome} className="form-control nome" name="nome" placeholder="Escreva aqui o seu nome completo" />
                                                </div>

                                                <div className="col-lg-4">
                                                    <label for="data_nascimento">Data de Nascimento</label>
                                                    <div className="row ">
                                                        <div className="col-lg-3">
                                                            <Select options={this.state.optionsDia} onChange={this.SelecionarDiaNascimento} className="dianascimento" name="dianascimento" placeholder={this.state.data_nascimento.substring(8, 10) || "Dia"} />

                                                        </div>

                                                        <div className="col-lg-6">
                                                            <Select options={this.state.optionsMes} onChange={this.SelecionarMesNascimento} className="mesnascimento" name="mesnascimento" placeholder={this.state.data_nascimento.substring(5, 7) || "Mes"} />

                                                        </div>

                                                        <div className="col-lg-3">
                                                            <Select options={this.state.optionsAno} onChange={this.SelecionarAnoNascimento} className="anonascimento" name="anonascimento" placeholder={this.state.data_nascimento.substring(0, 4) || "Ano"} />

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2">
                                                    <label for="BI">N.º do Bilhete de Identidade</label>
                                                    <input type="number" onChange={this.handleChange} value={this.state.ndi} name="ndi" className="form-control ndi" placeholder="N.º do Bilhete de Identidade" />
                                                </div>

                                            </div>

                                            <div className="form-row">

                                                <div className="col-lg-4">
                                                    <label for="">Data de Emissão</label>
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Select options={this.state.optionsDia} onChange={this.SelecionarDiaEmissao} className="diaemissao" name="diaemissao" placeholder={this.state.dtEmissao.substring(8, 10) || "Dia"} />

                                                        </div>

                                                        <div className="col-lg-6">
                                                            <Select options={this.state.optionsMes} onChange={this.SelecionarMesEmissao} className="mesemissao" name="mesemissao" placeholder={this.state.dtEmissao.substring(5, 7) || "Mes"} />

                                                        </div>

                                                        <div className="col-lg-3">
                                                            <Select options={this.state.optionsAno} onChange={this.SelecionarAnoEmissao} className="anoemissao" name="anoemissao" placeholder={this.state.dtEmissao.substring(0, 4) || "Ano"} />

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2">
                                                    <label for="">Estado Civil</label>
                                                    <Select options={this.state.optionsEstadoCivil} onChange={this.SelecionarEstadoCivil} className="estado_civil" name="estado_civil" placeholder="Seleccione" />

                                                </div>


                                                <div className="col-lg-2">
                                                    <label for="genero">Género</label>
                                                    <Select options={this.state.optionsGenero} onChange={this.SelecionarGenero} className="genero" name="genero" placeholder="Seleccione" />

                                                </div>
                                                <div className="col-lg-2">
                                                    <label for="provincia">Província</label>
                                                    <Select options={this.state.optionsProvincia} onChange={this.buscarMunicipio} className="provincia" name="provincia" placeholder="Seleccione" />

                                                </div>
                                                <div className="col-lg-2">
                                                    <label for="">Naturalidade</label>
                                                    <Select options={this.state.optionsNaturalidade} onChange={this.SelecionarMunicipio} className="base_municipio_id" name="base_municipio_id" placeholder="Seleccione" />

                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <div className="col-lg-2">
                                                    <label>País de Residência</label>
                                                    <Select options={this.state.optionsPaisResidencia} onChange={this.buscarProvincia} className="base_municipio_id" name="paisresidencia" placeholder="Seleccione" />

                                                </div>
                                                <div className="col-md-2">
                                                    <label for="p_residencia">Província de Residência</label>
                                                    <Select options={this.state.optionsProvinciaResidencia} onChange={this.buscarMunicipioResidencia} name="provinciaresidencia" placeholder="Seleccione" />


                                                </div>

                                                <div className="col-md-2">
                                                    <label for="m_residencia">Município de Residência</label>

                                                    <Select options={this.state.optionsMunicipioResidencia} onChange={this.SelecionarMunicipioResidencia} className="municipio_residencia_id" name="municipio_residencia_id" placeholder="Seleccione" />

                                                </div>
                                                <div className="col-lg-6 form-group text-left">
                                                    <label for="m_residencia">Endereço</label>
                                                    <input className="form-control" name="endereco" onChange={this.handleChange} type="text" placeholder="Endereço" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3 ">
                                                <div className="col-lg-4">
                                                    <label for="t_principal">Telefone principal</label>
                                                    <input className="form-control telefone_principal" name="telefone_principal" onChange={this.handleChange} type="number" />
                                                </div>
                                                <div className="col-lg-4">
                                                    <label for="">Telefone Alternativo</label>
                                                    <input className="form-control" name="telefone_alternativo" onChange={this.handleChange} type="number" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-4">
                                                <div className="col-lg-4">
                                                    <label for="">Nome do Banco</label>
                                                    <input className="form-control" name="banco" onChange={this.handleChange} type="text" placeholder="Nome do Banco" />
                                                </div>
                                                <div className="col-lg-4">
                                                    <label for="">Conta Bancaria</label>
                                                    <input className="form-control" name="conta_bancaria" onChange={this.handleChange} type="number" maxlength="13" placeholder="Conta Bancaria" />
                                                </div>
                                                <div className="col-lg-4">
                                                    <label for="">IBAN</label>
                                                    <input className="form-control" name="iban" onChange={this.handleChange} type="text" maxlength="25" placeholder="IBAN" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/*<!--Formação concluida-->*/}
                                    <div className="card mt-3 mb-2">
                                        <div className="card-header">
                                            <h4 style={{ color: 'red' }}><strong>Formação concluida</strong></h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-row">
                                                <form className="col-lg-4">
                                                    <label>País</label>
                                                    <Select options={this.state.optionsPaisFormacao} onChange={this.buscarProvinciaFormacao} className="paisformacao" name="paisformacao" placeholder="Seleccione" />

                                                </form>
                                                <form className="col-lg-4">
                                                    <label>Província</label>
                                                    <Select options={this.state.optionsProvinciaFormacao} onChange={this.buscarNIvelAcademico} className="provinciaformacao" name="provinciaformacao" placeholder="Seleccione" />

                                                </form>
                                                <form className="col-lg-4">
                                                    <label>Nível Académico</label>
                                                    <Select options={this.state.optionsNivelAcademico} onChange={this.buscarInstituicao} className="nivel_academico" name="nivel_academico" placeholder="Seleccione" />

                                                </form>
                                            </div>

                                            <div className="form-row mt-3">
                                                <form className="col-lg-4">
                                                    <label>Instituição</label>
                                                    <Select options={this.state.optionsInstituicao} onChange={this.SelecionarInstituicao} className="edu_instituicao_id" name="edu_instituicao_id" placeholder="Seleccione" />

                                                </form>

                                                <form className="col-lg-3">
                                                    <label>Curso</label>
                                                    <Select options={this.state.optionsCurso} onChange={this.SelecionarCurso} className="base_curso_id" name="base_curso_id" placeholder="Seleccione" />

                                                </form>

                                                <form className="col-lg-1">
                                                    <label>Média</label>
                                                    <input className="form-control media" name="media" onChange={this.handleChange} type="number" placeholder="Média" />
                                                </form>

                                                <form className="col-lg-2">
                                                    <label>Ano de Ingresso</label>
                                                    <input className="form-control ano_ingresso" name="ano_ingresso" onChange={this.handleChange} type="number" placeholder="Ano de Ingresso" />
                                                </form>

                                                <form className="col-lg-2">
                                                    <label>Ano de Conclusão</label>
                                                    <input className="form-control ano_conclusao" name="ano_conclusao" onChange={this.handleChange} type="number" placeholder="Ano de Conclusão" />
                                                </form>
                                            </div>

                                        </div>
                                    </div>

                                    {/*<!--Anexos-->*/}
                                    <div className="card mt-3 mb-2">
                                        <div className="card-header">
                                            <h4 style={{ color: 'red' }}><strong>Anexos</strong></h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-row  alert alert-info">
                                                <h5>Dica: Para carregar com sucesso os anexo, <strong>Salva de forma individual</strong> ou seleciona 2 a 3 ficheiros
                                    e clica em <strong>salvar todos anexos</strong> e assim por diante </h5>
                                                <h5>Só são aceites documentos no <strong> formato PDF com tamanho maximo de 1 MB </strong> </h5>
                                            </div>

                                            <div className="form-row">

                                                {
                                                    this.state.anexos.map(anexo => {
                                                        return (
                                                            <div className="col-lg-4 form-group">
                                                                <label for="">{anexo.nome} <span className="text-primary"> PDF máximo 1MB </span></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <button onClick={(e) => { e.preventDefault(); this.upload(anexo.id) }} className="btn btn-info   upload">Salvar </button>
                                                                    </div>
                                                                    <div className="custom-file">
                                                                        <input onChange={(e) => this.salvarpdf(e, anexo.id)} id="inputGroupFile01" type="file"
                                                                            name={`files_${anexo.nome}[]`} className="custom-file-input" accept="application/pdf" />
                                                                        <label className="custom-file-label" for="inputGroupFile01">{anexo.nome}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    {/* <!--Candidaturas-->*/}
                                    <div className="card mt-3 mb-2">
                                        <div className="card-header">
                                            <h4 style={{ color: 'red' }}><strong>Candidaturas</strong></h4>
                                        </div>

                                        <div className="card-body">
                                            {/* <!--wey essa informação aparece se o candidato ainda não possui a candidactura-->*/}
                                            <div className="form-row alert alert-success">
                                                Já possui candidatura registada para esta bolsa: <h5>{'{bolsa.observacao}'}</h5>
                                            </div>

                                            <div >
                                                <div className="form-row" className="form-row alert alert-info">
                                                    <h5>Estás a candidatar-se a {'{bolsa.nome}'}</h5>
                                                </div>
                                                <h5 className="text-danger"> <strong> {'{bolsa.observacao}'} </strong></h5>
                                                <div className="form-row">
                                                    <div className="col-lg-4">
                                                        <label>País: </label>
                                                        <Select options={this.state.optionsPaisActivos} onChange={this.buscarProvinciaCandidatura} className="paisactivo" name="paisactivo" placeholder="Seleccione" />

                                                    </div>

                                                    <div className="col-lg-4">
                                                        <label>Estado / Província: </label>
                                                        <Select options={this.state.optionsProvinciasCandidaturas} onChange={this.buscarProvinciaCandidatura} className="provincias" name="provincias" placeholder="Seleccione" />

                                                    </div>

                                                    <div className="col-lg-4">
                                                        <label>Instituição: </label>
                                                    </div>
                                                </div>
                                                {/*<!--Até aqui-->*/}

                                                {/*<!--caso não possua a bolsa, então aparece esta info-->*/}
                                                <div className="form-row mt-3">
                                                    <div className="col-lg-4">
                                                        <label>Curso</label>
                                                        <select className="custom-select">
                                                            <option selected value=""></option>
                                                        </select >
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <label>Média anterior</label>
                                                        <input type="number" className="form-control" />
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <label>Ano de Ingresso</label>
                                                        <input type="number" className="form-control" />
                                                    </div>

                                                    <div className="col-lg-2">
                                                        <label> Ano de Frequencia </label>
                                                        <input type="number" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right" >
                                        <button type="button" onClick={this.addCandidatura} className="btn btn-primary">Submeter</button>
                                    </div>
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

export default withRouter(FormCandidatura);