

var statu = "Falha ao carregar no Servidor"
var nome_universidade = "Falha ao carregar no Servidor"
var nome_pais = "Falha ao carregar no Servidor"
//var baixa_motivo = "Falha ao carregar no Servidor"
var provincia_origem = "Falha ao carregar no Servidor"
var provincia_cuba = "Falha ao carregar no Servidor"
var curso = "Falha ao carregar no Servidor"
var estudanteF = [];

var estudanteAano = [];
let flagAno = false;
let ContaEstudantesDoAno = 0;

var estudanteSexo = [];
let flagSexo = false;
let ContaEstudantesDoSexo = 0;

var estudanteUniversity = [];
let flaguniversity = false;
let ContaEstudantesDauniversity = 0;

var estudanteProvincia = [];
let flagProvincia = false;
let ContaEstudantesProvincia = 0;

var estudanteProvinciaC = [];
let flagProvinciaC = false;
let ContaEstudantesProvinciaC = 0;

var estudanteAformacao = [];
let flagAformacao = false;
let ContaEstudantesAformacao = 0;

var estudantecurso = [];
let flagCurso = false;
let ContaEstudantesCurso = 0;


export const JuntarColecion = (est, mest, dout) => {

    let arr = []

    let k = 0;
    for (let i = 0; i < est.length; i++) {
        arr[k++] = est[i];
    }
    for (let i = 0; i < mest.length; i++) {
        arr[k++] = mest[i];
    }
    for (let i = 0; i < dout.length; i++) {
        arr[k++] = dout[i];
    }
    return arr
}

export const EstudantesData = (est, uni, pro, cur) => {

    for (let i = 0; i < est.length; i++) {

        for (let j = 0; j < uni.length; j++) {
            if (est[i].universidade === uni[j]._id) {
                nome_universidade = uni[j].nome
                est[i].universidade = nome_universidade
                break
            }
        }

        for (let j = 0; j < pro.length; j++) {
            if (est[i].provincia_origem === pro[j]._id) {
                provincia_origem = pro[j].nome
                est[i].provincia_origem = provincia_origem
                break
            }
        }

        for (let j = 0; j < pro.length; j++) {
            if (est[i].provincia_cuba === pro[j]._id) {
                provincia_cuba = pro[j].nome
                est[i].provincia_cuba = provincia_cuba
                break
            }
        }

        for (let j = 0; j < cur.length; j++) {
            if (est[i].curso === cur[j]._id) {
                curso = cur[j].nome
                est[i].curso = curso
                break
            }
        }

    }
    // sort by one attribute
    sortArray(est, "nome"); // Asc
    return est
}

export const BaixaMotivoData = (baixa, motivo, estudantes, province) => {

    let ejemplo = []
    let k = 0

    for (let i = 0; i < baixa.length; i++) {
        for (let j = 0; j < motivo.length; j++) {

            if (baixa[i].motivo === motivo[j]._id) {
                baixa[i].motivo = motivo[j].motivo
                break
            }
        }
    }

    for (let i = 0; i < baixa.length; i++) {
        for (let j = 0; j < estudantes.length; j++) {

            if (baixa[i].idestudante === estudantes[j]._id) {

                ejemplo[k++] = ({
                    id: estudantes[j]._id,
                    foto: estudantes[j].foto,
                    nome: estudantes[j].nome,
                    sexo: estudantes[j].sexo,
                    provincia_cuba: estudantes[j].provincia_cuba,
                    ano_academico: baixa[i].ano_baixa, // na realidade este é ano da baixa fiz isso para reutilizar os filtros
                    motivo: baixa[i].motivo
                })
                break
            }
        }
    }

    ejemplo = TransformaBaixa(ejemplo, province)

    return ejemplo
}
export const BaixaFiltro = (est, nome, provinceC, ano, sexo) => {

    estudanteF = []
    estudanteAano = []
    estudanteSexo = []
    estudanteUniversity = []
    estudanteProvincia = []
    estudanteProvinciaC = []
    estudantecurso = []
    estudanteAformacao = []

    /* Filtrar por nome */
    PorNome(est, nome)

    /* Aqui filtro os estudantes por provincia de cuba */
    if (provinceC !== null && provinceC !== "") {
        PorProvinciaC(estudanteF, provinceC);
    }
    /* Aqui filtro os estudantes por sexo*/
    if (sexo !== null && sexo !== "") {
        PorSexo(estudanteF, sexo);
    }
    /* Aqui filtro os estudantes por ano */
    if (ano !== null && ano !== "") {
        PorAno(estudanteF, ano);
    }

    const estud = estudanteF.map(
        e => {
            return {
                id: e.id,
                foto: e.foto,
                nome: e.nome,
                sexo: e.sexo,
                provincia_cuba: e.provincia_cuba,
                ano_academico: e.ano_academico, // na realidade este é ano da baixa fiz isso para reutilizar os filtros
                motivo: e.motivo,
            }
        })
    // sort by one attribute
    sortArray(estud, "nome"); // Asc
    return estud
}

export const TransformaBaixa = (est, pro) => {
    for (let i = 0; i < est.length; i++) {
        for (let j = 0; j < pro.length; j++) {
            if (est[i].provincia_cuba === pro[j]._id) {
                est[i].provincia_cuba = pro[j].nome
                break
            }
        }


    }
    // sort by one attribute
    sortArray(est, "nome"); // Asc
    return est
}


export const ProvinciaData = (provincia, pais) => {

    for (let i = 0; i < provincia.length; i++) {

        for (let j = 0; j < pais.length; j++) {
            if (provincia[i].idpais === pais[j]._id) {
                nome_pais = pais[j].nome
                provincia[i].idpais = nome_pais
                break
            }
        }
    }

    return provincia
}


export const GraduadoEstudanteData = (graduados, est, uni, pro, cur) => {

    let lstestudiantes = []
    let k = 0

    for (let i = 0; i < est.length; i++) {

        for (let j = 0; j < uni.length; j++) {
            if (est[i].universidade === uni[j]._id) {
                nome_universidade = uni[j].nome
                est[i].universidade = nome_universidade
                break
            }
        }

        for (let j = 0; j < pro.length; j++) {

            if (est[i].provincia_origem === pro[j]._id) {
                provincia_origem = pro[j].nome
                est[i].provincia_origem = provincia_origem

                break
            }
        }

        for (let j = 0; j < pro.length; j++) {
            if (est[i].provincia_cuba === pro[j]._id) {
                provincia_cuba = pro[j].nome
                est[i].provincia_cuba = provincia_cuba
                break
            }
        }

        for (let j = 0; j < cur.length; j++) {
            if (est[i].curso === cur[j]._id) {
                curso = cur[j].nome
                est[i].curso = curso
                break
            }
        }

    }

    for (let i = 0; i < graduados.length; i++) {
        for (let j = 0; j < est.length; j++) {

            if (graduados[i].idestudante === est[j]._id) {
                lstestudiantes[k++] = ({
                    _id: est[j]._id,
                    foto: est[j].foto,
                    nome: est[j].nome,
                    sexo: est[j].sexo,
                    nivel_academico: est[j].nivel_academico,
                    provincia_cuba: est[j].provincia_cuba,
                    provincia_origem: est[j].provincia_origem,
                    ano_academico: graduados[i].ano_graduado, // na realidade este é ano da graduação, fiz isso para reutilizar os filtros
                    universidade: est[j].universidade,
                    curso: est[j].curso
                })
                break
            }

        }

    }

    //console.log(lstestudiantes)

    return lstestudiantes
}

export const EstuData = (est, uni, pro, cur) => {

    for (let j = 0; j < uni.length; j++) {
        if (est.universidade === uni[j]._id) {
            nome_universidade = uni[j].nome
            est.universidade = nome_universidade
            break
        }
    }

    for (let j = 0; j < pro.length; j++) {
        if (est.provincia_origem === pro[j]._id) {
            provincia_origem = pro[j].nome
            est.provincia_origem = provincia_origem
            break
        }
    }

    for (let j = 0; j < pro.length; j++) {
        if (est.provincia_cuba === pro[j]._id) {
            provincia_cuba = pro[j].nome
            est.provincia_cuba = provincia_cuba
            break
        }
    }

    for (let j = 0; j < cur.length; j++) {
        if (est.curso === cur[j]._id) {
            curso = cur[j].nome
            est.curso = curso
            break
        }
    }

    statu = est
    return statu
}

export const EstudantesTabela = (est) => {

    const estud = est.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                sexo: e.sexo,
                anoacademico: e.ano_academico,
                universidade: e.universidade,
                provincia: e.provincia_cuba,
                curso: e.curso,
                carne_identidade: e.carne_identidade,
                CTA_MLC: e.CTA_MLC,
            }
        })

    return estud
}

export const EstudantesFiltro = (est, nome, provinceC, provinceA, ano, sexo, university, aformacao, curso, cursos) => {

    estudanteF = []
    estudanteAano = []
    estudanteSexo = []
    estudanteUniversity = []
    estudanteProvincia = []
    estudanteProvinciaC = []
    estudantecurso = []
    estudanteAformacao = []

    /* Filtrar por nome */
    PorNome(est, nome)

    /* Aqui filtro os estudantes por provincia de angola*/
    if (provinceA !== null && provinceA !== "") {
        PorProvincia(estudanteF, provinceA);
    }
    /*Filtrar por universidade */
    if (university !== null && university !== "") {
        PorUniversidade(estudanteF, university);
    }
    /* Aqui filtro os estudantes por provincia de cuba */
    if (provinceC !== null && provinceC !== "") {
        PorProvinciaC(estudanteF, provinceC);
    }
    /* Aqui filtro os estudantes por sexo*/
    if (sexo !== null && sexo !== "") {
        PorSexo(estudanteF, sexo);
    }
    /* Aqui filtro por curso */
    if (curso !== null && curso !== "") {
        PorCurso(estudanteF, curso);
    }

    /* Aqui filtro os estudantes por ano */
    if (ano !== null && ano !== "") {
        PorAno(estudanteF, ano);
    }

    /* Aqui filtro os estudantes por area de formação */
    if (cursos !== null && cursos !== "") {
        PorAformacao(estudanteF, aformacao, cursos);
    }

    const estud = estudanteF.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                sexo: e.sexo,
                anoacademico: e.ano_academico,
                universidade: e.universidade,
                provincia: e.provincia_cuba,
                provinciaOrigen: e.provincia_origem,
                curso: e.curso,
                foto: e.foto,
                nivel: e.nivel_academico,
                carne_identidade: e.carne_identidade,
                CTA_MLC: e.CTA_MLC,
            }
        })
    // sort by one attribute
    sortArray(estud, "nome"); // Asc
    return estud
}

export const PorProvinciaC = (colecao, valor) => {
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].provincia_cuba === valor && colecao[i].provincia_cuba !== '') {
            estudanteProvinciaC[k] = colecao[i]
            k++
            flagProvinciaC = true;
        }
        if (colecao[i].provincia_cuba !== valor) {
            ContaEstudantesProvinciaC++;
            flagProvinciaC = true;
        }
        if ('' === valor) {
            estudanteProvinciaC[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesProvinciaC === colecao.length) {
        estudanteF = [];
        ContaEstudantesProvinciaC = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagProvinciaC) {
        estudanteF = estudanteProvinciaC;
        flagProvinciaC = false;
    }

    return estudanteProvinciaC;

}

export const PorProvincia = (colecao, valor) => {
    estudanteProvincia = []
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].provincia_origem === valor && colecao[i].provincia_origem !== '') {
            estudanteProvincia[k++] = colecao[i]
            flagProvincia = true;
        }
        if (colecao[i].provincia_origem !== valor) {
            ContaEstudantesProvincia++;
            flagProvincia = true;
        }
        if ('' === valor) {
            estudanteProvincia[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesProvincia === colecao.length) {
        estudanteF = [];
        ContaEstudantesProvincia = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagProvincia) {
        estudanteF = estudanteProvincia;
        flagProvincia = false;
    }

    return estudanteProvincia;

}

export const PorNome = (est, nome) => {
    var j = 0;
    estudanteF = [];
    let Nomecolecao
    let Nomeenviado
    for (let i = 0; i < est.length; i++) {
        if (est[i].nome !== null && est[i].nome !== "") {
            Nomecolecao = SubstituirAcento(est[i].nome.toLowerCase()); // aqui converto em string minusculo sem acento
            Nomeenviado = SubstituirAcento(nome.toLowerCase());
            if (Nomecolecao.indexOf(Nomeenviado) !== -1 && Nomecolecao.indexOf(Nomeenviado) !== '') {
                estudanteF[j++] = est[i]
            }
        }
    }
    return estudanteF;
}

export const PorAno = (colecao, valor) => {
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].ano_academico === valor && colecao[i].ano_academico !== '') {
            estudanteAano[k++] = colecao[i]
            flagAno = true;
        }
        if (colecao[i].ano_academico !== valor) {
            ContaEstudantesDoAno++;
            flagAno = true;
        }
        if ('' === valor) {
            estudanteAano[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesDoAno === colecao.length) {
        estudanteF = [];
        ContaEstudantesDoAno = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagAno) {
        estudanteF = estudanteAano;
        flagAno = false;
    }

    return estudanteAano;
}

export const PorSexo = (colecao, valor) => {
    var l = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].sexo === valor && colecao[i].sexo !== '') {
            estudanteSexo[l] = colecao[i]
            l++
            flagSexo = true;
        }
        if (colecao[i].sexo !== valor) {
            ContaEstudantesDoSexo++;
            flagSexo = true;
        }
        if ('' === valor) {
            estudanteSexo[l++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesDoSexo === colecao.length) {
        estudanteF = [];
        ContaEstudantesDoSexo = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagSexo) {
        estudanteF = estudanteSexo;
        flagSexo = false;
    }

    return estudanteSexo;
}

export const PorUniversidade = (colecao, valor) => {
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].universidade === valor && colecao[i].universidade !== '') {
            estudanteUniversity[k] = colecao[i]
            k++
            flaguniversity = true;
        }
        if (colecao[i].universidade !== valor) {
            ContaEstudantesDauniversity++;
            flaguniversity = true;
        }
        if ('' === valor) {
            estudanteUniversity[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesDauniversity === colecao.length) {
        estudanteF = [];
        ContaEstudantesDauniversity = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flaguniversity) {
        estudanteF = estudanteUniversity;
        flaguniversity = false;
    }

    return estudanteUniversity;
}

export const PorCurso = (colecao, valor) => {
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        if (colecao[i].curso === valor && colecao[i].curso !== '') {
            estudantecurso[k++] = colecao[i]
            flagCurso = true;
        }
        if (colecao[i].curso !== valor) {
            ContaEstudantesCurso++;
            flagCurso = true;
        }
        if ('' === valor) {
            estudantecurso[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesCurso === colecao.length) {
        estudanteF = [];
        ContaEstudantesCurso = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagCurso) {
        estudanteF = estudantecurso;
        flagCurso = false;
    }

    return estudantecurso;
}

export const PorAformacao = (colecao, valor, cursos) => {
    var k = 0;
    for (let i = 0; i < colecao.length; i++) {
        for (let j = 0; j < cursos.length; j++) {
            if (colecao[i].curso === cursos[j].nome && cursos[j].areaformacao === valor && cursos[j].areaformacao !== '') {
                estudanteAformacao[k++] = colecao[i]
                flagAformacao = true;
            } else
                if (colecao[i].curso === cursos[j].nome && cursos[j].areaformacao !== valor) {
                    ContaEstudantesAformacao++;
                    flagAformacao = true;
                }
        }
        if ('' === valor) {
            estudanteAformacao[k++] = colecao[i]
        }
    }

    /* Aqui estou a dizer que se não existe estudante de um ano especifico, não me mostre nada */
    if (ContaEstudantesAformacao === colecao.length) {
        estudanteF = [];
        ContaEstudantesAformacao = 0;
    }
    /* Aqui digo que se selecionei uma provincia e um ano, devo reduzir a coleção só para os estudantes deste ano nesta provincia */
    if (flagAformacao) {
        estudanteF = estudanteAformacao;
        flagAformacao = false;
    }

    return estudanteAformacao;
}
export const GraduadosTabela = (estud, gradu) => {

    for (let i = 0; i < estud.length; i++) {
        let ano_graduado = "falha no sistema"
        for (let j = 0; j < gradu.length; j++) {
            if (estud[i]._id === gradu[j].idestudante) {
                ano_graduado = gradu[j].ano_graduado
                break
            }
        }

        estud[i] = {
            id: estud[i]._id,
            nome: estud[i].nome,
            sexo: estud[i].sexo,
            universidade: estud[i].universidade,
            curso: estud[i].curso,
            nivel: estud[i].nivel_academico,
            ano_graduado: ano_graduado,
            provincia: estud[i].provincia_origem
        }

    }

    return estud
}
export const BaixaTabela = (baixa, mot) => {
    for (let i = 0; i < baixa.length; i++) {
        let motivo_b = "falha no sistema"
        for (let j = 0; j < mot.length; j++) {
            if (baixa[i].motivo === mot[j]._id) {
                motivo_b = mot[j].motivo
                break
            }
        }

        baixa[i] = {
            id: baixa[i]._id,
            nome: baixa[i].nome,
            sexo: baixa[i].sexo,
            universidade: baixa[i].universidade,
            curso: baixa[i].curso,
            anoacademico: baixa[i].nivel_academico,
            motivo: motivo_b,
        }

    }


    return baixa
}
export const CursoTabela = (cur, area) => {
    for (let i = 0; i < cur.length; i++) {
        let are = "falha no sistema"
        for (let j = 0; j < area.length; j++) {
            if (cur[i].areaformacao === area[j]._id) {
                are = area[j].nome
                break
            }
        }

        cur[i] = {
            id: cur[i]._id,
            nome: cur[i].nome,
            area: are
        }

    }


    return cur
}


export const UniversidadeDado = (univ, arr) => {

    for (let j = 0; j < arr.length; j++) {
        let pro = "falha no sistema"
        if (univ.provincia === arr[j]._id) {
            pro = arr[j].nome
            univ = {
                id: univ._id,
                nome: univ.nome,
                alias: univ.alias,
                telefone: univ.telefone,
                provincia: pro,
            }
            break
        }
    }
    return univ
}

export const CursoDado = (curso, arr) => {

    for (let j = 0; j < arr.length; j++) {
        let pro = "falha no sistema"
        if (curso.areaformacao === arr[j]._id) {
            pro = arr[j].nome
            curso = {
                _id: curso._id,
                nome: curso.nome,
                duracao_curso: curso.duracao_curso,
                areaformacao: pro,
            }
            break
        }
    }
    return curso
}

export const BaixaData = (baix, uni, cur,) => {
    for (let i = 0; i < baix.length; i++) {

        for (let j = 0; j < uni.length; j++) {
            if (baix[i].universidade === uni[j]._id) {
                nome_universidade = uni[j].nome
                baix[i].universidade = nome_universidade
                break
            }
        }

        for (let j = 0; j < cur.length; j++) {
            if (baix[i].curso === cur[j]._id) {
                curso = cur[j].nome
                baix[i].curso = curso
                break
            }
        }
    }

    statu = baix
    return statu
}


export const SubstituirAcento = (valor) => {
    let caracteres = {

        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",

        "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n", "ç": "c",

        "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",

        "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N", "Ç": "C",

        "â": "a", "ê": "e", "î": "i", "ô": "o", "û": "u",

        "Â": "A", "Ê": "E", "Î": "I", "Ô": "O", "Û": "U",

        "ã": "a", "õ": "o",

        "Ã": "A", "Õ": "O",
    }

    var expr = /[áàâãéèêíîìóòôõúùûñç]/ig;

    var res = valor.replace(expr, function (e) { return caracteres[e] });

    return res;

}

export const sortArray = (array, property, direction) => {
    direction = direction || 1;
    array.sort(function compare(a, b) {
        let comparison = 0;
        if (a[property] > b[property]) {
            comparison = 1 * direction;
        } else if (a[property] < b[property]) {
            comparison = -1 * direction;
        }
        return comparison;
    });
    return array; // Chainable
}

export const CrearPasos = valor => {
    let array = []
    array[0] = 5;
    array[1] = 10;
    for (let i = 2; i < valor; i++) {
        if (valor <= 100) {
            array[i] = array[i - 1] + 10
            if (array[i] > valor) {
                array[i] = valor
                break;
            }
        } else if (valor <= 200 && valor > 100) {
            array[i] = array[i - 1] + 20
            if (array[i] > valor) {
                array[i] = valor
                break;
            }
        } else if (valor <= 500 && valor > 200) {
            array[i] = array[i - 1] + 40
            if (array[i] > valor) {
                array[i] = valor
                break;
            }
        } else {

            if (valor > 500) {
                array[2] = 50
                array[3] = 100
                array[i + 2] = array[i + 1] + 300
                if (array[i + 2] > valor) {
                    array[i + 2] = valor
                    break;
                }
            }
        }


    }

    return array;
};