import { api, defaultResponse } from '../api'
export const actions = {
    async createCustomer({rootGetters, commit, dispatch}, customer) {    
        commit('creatingCustomer', true)
        try {
            let userId = rootGetters['login/id']
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/criarCliente/${userId}`, customer, {
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
                commit('creatingCustomer', false)
                return { status, message, data }
            }
            commit('creatingCustomer', false)
        } catch (error) {
            commit('creatingCustomer', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao criar cliente", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao criar cliente", data: error }
            }
        }
    },     
}