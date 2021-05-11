import axios from 'axios';

const urlHml = 'http://localhost:9001'

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? urlHml : urlHml
});

export let defaultResponse = {
    status: false,
    message: "",
    data: null
}

//verificação de sessão antes de qualquer requisição
// api.interceptors.request.use(async (response) => {
//     await store.dispatch('buscaUsuario')
//     let usuarioAutenticado = store.getters.usuarioAutenticado
//     if(usuarioAutenticado == false) {
//         Promise.reject('Sessão inválida');
//         return false
//     }
//     return response
// }, function(err) {
//     return Promise.reject(err);
// });

export default {
    api,
    defaultResponse
}