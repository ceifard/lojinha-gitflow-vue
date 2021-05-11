import Vue from 'vue'
import Vuex from 'vuex'

import login from './login/login'

Vue.use(Vuex)

const state = {
    carregando: false,
    mensagem: '',
  }
  
  const getters = {
    carregando: store => store.carregando,
    mensagem: store => store.mensagem,
  }
  
  const mutations = {
    carregando (state, obj) {
      state.carregando = obj
    },
    mensagem (state, obj) {
      state.mensagem = obj
    },
  }
  
  const actions = {
    //   async registraErro({commit}, msgErro) {    
    //     commit('setCarregandoListagem', true)
    //     try {
    //         let nodeEnv = process.env.NODE_ENV
    //         let compDate = process.env.VUE_APP_COMPILIATION_DATE
    //         let appName = process.env.VUE_APP_NAME
    //         console.log(appName);
    //         let data = {
    //             "env": nodeEnv,
    //             "appName": appName,
    //             "buildDate": !!compDate ? compDate : new Date().toISOString(),
    //             "errorMsg": `${msgErro}`
    //         }
    //         let response = await apiHeroku.post('', data)
    //         if(response.status) {
    //             console.log("Erro encontrado, mensagem registrada.")
    //             return true
    //         } else {
    //             console.log("Mensagem de erro NÃO registrada.")
    //             return false
    //         }                    
    //     } catch (error) {
    //         console.log("Mensagem de erro registrada com sucesso.");
    //         console.log(error);
    //         return false              
    //     }
    // }        
  }

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    login
  }  
})