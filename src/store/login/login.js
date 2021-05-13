import {api, defaultResponse} from '../api'

let userToken = localStorage.getItem('token')
let userEmail = localStorage.getItem('email')

const state = {
    usuario: {
        email: !!userEmail ? JSON.parse(userEmail) : "",
        senha: "",
        token: !!userToken ? JSON.parse(userToken) : ""
    }
}

const getters = {
    usuario: store => store.usuario,
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
    async realizaLogin({getters, commit}, lembrarLogin) {
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
        if(status) {
            commit('senha', "")
            commit('token', data.token)
            if(lembrarLogin) {
                localStorage.setItem('email', JSON.stringify(email))
                localStorage.setItem('token', JSON.stringify(data.token))
            }
            return {status, message, data}
        } else {
            commit('senha', "")
            commit('token', "")    
            return {status, message, data}       
        }
      } catch (error) {
        commit('senha', "")
        commit('token', "")            
        let errorMsg = error.response ? error.response.data.message : "Não foi possível obter as informações de login"
        console.log(error);
        return {...defaultResponse, message: errorMsg, data: error}  
      }
    },    
    async realizaLogout({commit}) {
        commit('email', "")
        commit('senha', "")
        commit('token', "")  
        localStorage.removeItem('email')
        localStorage.removeItem('token')
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
    namespaced:true,
    state,
    mutations,
    getters,
    actions
  }