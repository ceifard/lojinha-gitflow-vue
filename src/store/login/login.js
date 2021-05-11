import axios from 'axios'

const state = {
    usuario: {
        "email": "",
        "senha": ""        
    }
}

const getters = {
    email: store => store.usuario.email,
    senha: store => store.usuario.senha,
}
  
const mutations = {
    email (state, obj) {
        state.usuario.email = obj
    },
    senha (state, obj) {
        state.usuario.senha = obj
    },
}
  
const actions = {
    // async buscaUsuario({commit}) {
    //   //dev
    //   if(process.env.NODE_ENV == 'development') {
    //     commit('usuarioAutenticado', true)
    //     return true
    //   }
    //   //--
    //   try {
    //     const response = await axios.get('/publico/controller/listarSessao.php')
    //     let usuario = response.data
    //     if(usuario.hasOwnProperty('status')) {
    //       if(usuario.status == false) {
    //         commit('usuarioAutenticado', false);  
    //         alert('Por favor, faça login novamente.')
    //         window.location.href = "/login";    
    //         return false      
    //       } else {
    //         commit('usuario', usuario)
    //         commit('usuarioAutenticado', true);  
    //         return true;            
    //       }
    //     }
    //   } catch (error) {
    //     commit('usuarioAutenticado', false);  
    //     alert('Não foi possível obter as informações de login');
    //     window.location.href = "/login";
    //     console.log("Não foi possível obter as informações de login")      
    //     return false  
    //   }
    // },    

}
  
  export default {
    state,
    mutations,
    getters,
    actions
  }