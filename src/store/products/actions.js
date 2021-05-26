import { api, defaultResponse } from '../api'
export const actions = {
    async adicionaProduto({rootGetters, commit, dispatch}, produto) {    
        commit('carregandoProdutosEmEstoque', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.post(`/produtos`, {...produto, preco: produto.preco.replace('R$ ', '')}, {
                headers: {
                    'authorization': userToken
                }
            })
            let {
                status,
                message,
                data
            } = response.data                
            if(status) {
                commit('listagemProdutosEmEstoque', response.data.data)
                commit('carregandoProdutosEmEstoque', false)
                return { status, message, data }
            }
            commit('carregandoProdutosEmEstoque', false)
        } catch (error) {
            commit('carregandoProdutosEmEstoque', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao adicionar produto", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao adicionar produto", data: error }
            }
        }
    },     
    async vendeProduto({rootGetters, commit, dispatch}, id) {    
        commit('carregandoProdutosEmEstoque', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.post(`/produtos/vender`, {id}, {
                headers: {
                    'authorization': userToken
                }
            })
            let {
                status,
                message,
                data
            } = response.data                
            if(status) {
                commit('listagemProdutosEmEstoque', response.data.data)
                commit('carregandoProdutosEmEstoque', false)
                return { status, message, data }
            }
            commit('carregandoProdutosEmEstoque', false)
        } catch (error) {
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                commit('carregandoProdutosEmEstoque', false)
                return { ...defaultResponse, message: "Erro ao vender produto", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao vender produto", data: error }
            }
        }
    },     
    async listaProdutosEmEstoque({rootGetters, commit, dispatch}) {    
        commit('carregandoProdutosEmEstoque', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.get('/produtos/em-estoque', {
                headers: {
                    'authorization': userToken
                }
            })
            let {
                status,
                message,
                data
            } = response.data                
            if(status) {
                commit('listagemProdutosEmEstoque', response.data.data)
                commit('carregandoProdutosEmEstoque', false)
                return { status, message, data }
            }
            commit('listagemProdutosEmEstoque', [])
            commit('carregandoProdutosEmEstoque', false)
        } catch (error) {
            // error.status == 401 ? dispatch('login/realizaLogout')
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                commit('listagemProdutosEmEstoque', [])
                commit('carregandoProdutosEmEstoque', false)
                return { ...defaultResponse, message: "Erro ao buscar produtos", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar produtos", data: error }
            }
        }
    },  
    async listaProdutosVendidos({rootGetters, commit, dispatch}) {    
        commit('carregandoProdutosVendidos', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.get('/produtos/vendidos', {
                headers: {
                    'authorization': userToken
                }
            })
            let {
                status,
                message,
                data
            } = response.data                
            if(status) {
                commit('listagemProdutosVendidos', response.data.data)
                commit('carregandoProdutosVendidos', false)
                return { status, message, data }
            }
            commit('listagemProdutosVendidos', [])
            commit('carregandoProdutosVendidos', false)
        } catch (error) {
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                commit('listagemProdutosVendidos', [])
                commit('carregandoProdutosVendidos', false)
                return { ...defaultResponse, message: "Erro ao buscar produtos", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar produtos", data: error }
            }
        }
    },  
}