import { api, defaultResponse } from '../api'
import router from '../../router'

let userId = localStorage.getItem('id')
let userSubscription = localStorage.getItem('id_assinatura')
let userToken = localStorage.getItem('token')
let userEmail = localStorage.getItem('email')

const state = {
    msgErro: "",
    usuario: {
        email: !!userEmail ? JSON.parse(userEmail) : "",
        senha: "",
        id: !!userId ? JSON.parse(userId) : "",
        id_assinatura: !!userSubscription ? JSON.parse(userSubscription) : "",
        token: !!userToken ? JSON.parse(userToken) : ""
    }
}

const getters = {
    msgErro: store => store.msgErro,
    usuario: store => store.usuario,
    email: store => store.usuario.email,
    senha: store => store.usuario.senha,
    id: store => store.usuario.id,
    id_assinatura: store => store.usuario.id_assinatura,
    token: store => store.usuario.token
}

const mutations = {
    msgErro(state, obj) {
        state.msgErro = obj
    },
    usuario(state, obj) {
        state.usuario = obj
    },    
    email(state, obj) {
        state.usuario.email = obj
    },
    senha(state, obj) {
        state.usuario.senha = obj
    },
    id(state, obj) {
        state.usuario.id = obj
    },
    id_assinatura(state, obj) {
        state.usuario.id_assinatura = obj
    },
    token(state, obj) {
        state.usuario.token = obj
    },
}

const actions = {
    async realizaLogin({ getters, commit }, lembrarLogin) {
        try {
            let {
                email,
                senha
            } = getters.usuario
            let response = await api.post('/usuarios/login', {
                email,
                senha
            })
            let {
                status,
                message,
                data
            } = response.data
            if (status) {
                commit('senha', "")
                commit('id', data.id_usuario)
                commit('token', data.token)
                if (lembrarLogin) {
                    localStorage.setItem('id', JSON.stringify(data.id_usuario))
                    localStorage.setItem('id_assinatura', JSON.stringify(data.id_assinatura))
                    localStorage.setItem('email', JSON.stringify(email))
                    localStorage.setItem('token', JSON.stringify(data.token))
                }
                return { status, message, data }
            } else {
                commit('senha', "")
                commit('token', "")
                return { status, message, data }
            }
        } catch (error) {
            commit('senha', "")
            commit('id', "")
            commit('id_assinatura', "")
            commit('token', "")
            let errorMsg = error.response ? error.response.data.message : "Não foi possível obter as informações de login"
            console.log(error);
            return { ...defaultResponse, message: errorMsg, data: error }
        }
    },
    async verificaToken({ getters, dispatch }) {
        try {
            let userToken = getters.token
            if (!!userToken) {
                let response = await api.get('/usuarios/verificaToken', {
                    headers: {
                        'authorization': userToken
                    }
                })
            }
        } catch (error) {
            if (error.response) {
                dispatch('realizaLogout')
                router.push({ 
                    name: 'Login', 
                    params: { 
                        tokenError: 'Sua sessão expirou :(' 
                    } 
                })
            } else {
                console.log({
                    tipo: "Erro ao validar token",
                    erro: error
                })
            }
        }
    },
    async realizaLogout({ commit }) {
        commit('products/resetState', null, {root: true})
        commit('subscription/resetState', null, {root: true})
        commit('email', "")
        commit('senha', "")
        commit('id', "")
        commit('id_assinatura', "")
        commit('token', "")        
        localStorage.removeItem('id')
        localStorage.removeItem('id_assinatura')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    },
    async cadastraUsuario({ getters, commit }) {
        try {
            let {
                email,
                senha
            } = getters.usuario
            let {
                status,
                message,
                data
            } = await api.post('/usuarios', {
                email,
                senha
            })
            if (status) {
                commit('email', "")
                commit('senha', "")
                return { status, message, data }
            } else {
                commit('email', "")
                commit('senha', "")
                return { status, message, data }
            }
        } catch (error) {
            commit('email', "")
            commit('senha', "")
            return { ...defaultResponse, message: "Não foi possível cadastrar o usuário", data: error }
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}