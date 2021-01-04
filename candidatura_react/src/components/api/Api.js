import axios from 'axios';

let host = "localhost";
let port = "3333";

export const BuscarTodos = (op) => {

    return fetch(`http://${host}:${port}/api/v1/${op}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });

}



export const Add = (state, op) => {
    return fetch(`http://${host}:${port}/api/v1/${op}`, {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}

export const Add_UpdatePessoa = (state, idpessoa, iduser) => {
    return fetch(`http://${host}:${port}/api/v1/pessoas/${idpessoa}`, {
        method: 'PUT',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}


export const Add_UpdateFormacao = (state, idpessoa, idformacaor) => {
    return fetch(`http://${host}:${port}/api/v1/pessoas/${idpessoa}/formacoes/${idformacaor}`, {
        method: 'PUT',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}



export const Update = (state, op, id) => {
    return fetch(`http://${host}:${port}/api/v1/${op}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}

export const Delete = (op, id) => {
    return fetch(`http://${host}:${port}/api/v1/${op}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}


export const AddFoto = (imagem, op) => {
    const data = new FormData()
    data.append('imagem', imagem)
    return axios
        .post(`http://${host}:${port}/api/${op}/foto`, data, {

        })
        .then(res => { return res })
}



export const BuscarPorId = (id, op) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/${op}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}


export const BuscarPessoaIdUser = (user_id) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/pessoas/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}



export const Constantes = (tipo) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/constants?tipo=${tipo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}

export const BuscarAnexo = (num) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/tiposanexos?categoria=${num}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}

export const BuscarMunicipioIdProvincia = (id) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/provincias/${id}/municipios`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}

export const BuscarProvinciaIdPais = (id) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/paises/${id}/provincias`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}

export const BuscarInstituicaoIdProvincia = (id) => {
    if (host !== "null") {
        return fetch(`http://${host}:${port}/api/v1/provincias/${id}/instituicoes/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.usertoken || ''}`
            
            }
        })
            .then(res => res.json())
            .then(data => {
                return data

            });
    }
}



//petições para o usuario........................
export const Registrar = (state, op) => {
    return fetch(`http://${host}:${port}/api/v1/${op}`, {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        });
}


export const Login = (state) => {
    return fetch(`http://${host}:${port}/api/v1/login`, {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.usertoken || ''}`
        
        }
    })
        .then(res => res.json())
        .then(data => {
           
            return data
        });
}