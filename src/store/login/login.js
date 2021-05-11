import {api, defaultResponse} from '../api'

const state = {
    usuario: {
        email: "",
        senha: "",
        token: ""
    }
}

const getters = {
    usuario: store => store.usuario.usuario,
    email: store => store.usuario.email,
    senha: store => store.usuario.senha,
    token: store => store.usuario.token
}
  
const mutations = {
    email (state, obj) {
        state.usuario.email = obj
    },
    usuario (state, obj) {
        state.usuario = obj
    },
    senha (state, obj) {
        state.usuario.senha = obj
    },
    token (state, obj) {
        state.usuario.token = obj
    },
}
  
const actions = {
    async realizaLogin({getters, commit}) {
      try {
        let {
            email,
            senha
        } = getters.usuario
        let {
            status,
            message,
            data
        } = await api.post('/usuarios/login', {
            email,
            senha            
        })
        if(status) {
            commit('senha', "")
            commit('token', token)
            return {status, message, data}
        } else {
            commit('senha', "")
            commit('token', "")    
            return {status, message, data}       
        }
      } catch (error) {
        commit('senha', "")
        commit('token', "")            
        return {...defaultResponse, message: "Não foi possível obter as informações de login", data: error}  
      }
    },    
    async realizaLogout({commit}) {
        commit('email', "")
        commit('senha', "")
        commit('token', "")  
    },    
    async cadastraUsuario({getters, commit}) {
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
          if(status) {
              commit('email', "")
              commit('senha', "")
              return {status, message, data}
          } else {
              commit('email', "")
              commit('senha', "")
              return {status, message, data}       
          }
        } catch (error) {
          commit('email', "")          
          commit('senha', "")          
          return {...defaultResponse, message: "Não foi possível cadastrar o usuário", data: error}  
        }
      },     

}
  
  export default {
    state,
    mutations,
    getters,
    actions
  }