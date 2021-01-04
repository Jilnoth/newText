export const FiltroUser = (colecao, nome)=>{


   colecao = PorNomeConf(colecao,nome);

    const user = colecao.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                usuario:e.userr,
                email:e.email,
                foto: e.imagem,
                nivel: e.nivelac,
            }
        })
    // sort by one attribute
    sortArray(user, "nome"); // Asc
    return user
}

export const FiltroUniversity = (colecao, nome)=>{
   colecao = PorNomeConf(colecao,nome);

    const university = colecao.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                alias:e.alias,
                telefone:e.telefone,
                email:e.email,
                provincia:e.provincia
            }
        })
    // sort by one attribute
    sortArray(university, "nome"); // Asc
    return university
}


export const UniversidadeTabela = (univ, prov) => {
    for (let i = 0; i < univ.length; i++) {
        let pro ='falha no sistema'
        for (let j = 0; j < prov.length; j++) {
            if (univ[i].provincia === prov[j]._id) {
                pro = prov[j].nome
                break
            }
        }

        univ[i] = {
            _id: univ[i]._id,
            nome: univ[i].nome,
            alias: univ[i].alias,
            telefone: univ[i].telefone,
            provincia: pro,
        }
    }

    return univ
}

export const CursoTabela = (Cursos, Areas) => {
    for (let i = 0; i < Cursos.length; i++) {
        let pro ='falha no sistema'
        for (let j = 0; j < Areas.length; j++) {
            if (Cursos[i].areaformacao === Areas[j]._id) {
                pro = Areas[j].nome
                break
            }
        }

        Cursos[i] = {
            _id: Cursos[i]._id,
            nome: Cursos[i].nome,
            duracao: Cursos[i].duracao_curso,
            areaformacao: pro,
        }
    }

    return Cursos
}



export const FiltroCourse = (colecao, nome)=>{


   colecao = PorNomeConf(colecao,nome);

    const course = colecao.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                duracao_curso:e.duracao_curso,
                area:e.areaformacao
            }
        })
    // sort by one attribute
    sortArray(course, "nome"); // Asc
    return course
}

export const FiltroAreaFormacao = (colecao, nome)=>{


   colecao = PorNomeConf(colecao,nome);

    const course = colecao.map(
        e => {
            return {
                id: e._id,
                nome: e.nome,
                descricao:e.descricao
            }
        })
    // sort by one attribute
    sortArray(course, "nome"); // Asc
    return course
}


export const FiltroOrganismo = (colecao, nome)=>{


    colecao = PorNomeConf(colecao,nome);
 
     const course = colecao.map(
         e => {
             return {
                 id: e._id,
                 nome: e.nome,
                 descricao:e.descricao
             }
         })
     // sort by one attribute
     sortArray(course, "nome"); // Asc
     return course
 }


 export const FiltroProvincia = (colecao, nome)=>{


    colecao = PorNomeConf(colecao,nome);
 
     const course = colecao.map(
         e => {
             return {
                 id: e._id,
                 nome: e.nome,
                 idpais:e.idpais
             }
         })
     // sort by one attribute
     sortArray(course, "nome"); // Asc
     return course
 }


export const FiltroMotivoBaixa = (colecao, motivo)=>{


    colecao = PorMtivoBaixa(colecao,motivo);
 
     const course = colecao.map(
         e => {
             return {
                 id: e._id,
                 motivo: e.motivo,
                 descricao:e.descricao
             }
         })
     // sort by one attribute
     sortArray(course, "nome"); // Asc
     return course
 }



 export const PorMtivoBaixa = (colecao, motivo) => {
    var j = 0;
   let  userColection = [];
    let Nomecolecao
    let Nomeenviado
    for (let i = 0; i < colecao.length; i++) {
        if(colecao[i].motivo!==null && colecao[i].motivo!==""){
        Nomecolecao = SubstituirAcento(colecao[i].motivo.toLowerCase()); // aqui converto em string minusculo sem acento
        Nomeenviado = SubstituirAcento(motivo.toLowerCase());
        if (Nomecolecao.indexOf(Nomeenviado) !== -1 && Nomecolecao.indexOf(Nomeenviado) !== '') {
            userColection[j++] = colecao[i]
        }
    }
     }
    return userColection;
}

export const PorNomeConf = (colecao, nome) => {
    var j = 0;
   let  userColection = [];
    let Nomecolecao
    let Nomeenviado
    for (let i = 0; i < colecao.length; i++) {
        if(colecao[i].nome!==null && colecao[i].nome!==""){
        Nomecolecao = SubstituirAcento(colecao[i].nome.toLowerCase()); // aqui converto em string minusculo sem acento
        Nomeenviado = SubstituirAcento(nome.toLowerCase());
        if (Nomecolecao.indexOf(Nomeenviado) !== -1 && Nomecolecao.indexOf(Nomeenviado) !== '') {
            userColection[j++] = colecao[i]
        }
    }
     }
    return userColection;
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
