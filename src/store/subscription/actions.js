import { api, defaultResponse } from '../api'
export const actions = {         
    async validateSubscription({rootGetters, commit, dispatch}) {    
        try {
            let userEmail = rootGetters['login/email']
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/validaAssinatura`,
            {
                "email": userEmail
            },            
            {
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
                return { status, message, data }
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.data);
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao buscar assinatura", data: error.response.data.data }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar assinatura", data: error }
            }
        }
    },    
    async cancelSubscription({rootGetters, getters, commit, dispatch}) {    
        commit('cancelling', true)
        try {
            let subscriptionId = getters.userSubscription.data.id
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/cancelarAssinatura`, {subscription_id: subscriptionId}, {
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
                commit('cancelling', false)
                return { status, message, data }
            }
            commit('cancelling', false)
        } catch (error) {
            commit('cancelling', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao cancelar plano", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao cancelar plano", data: error }
            }
        }
    },       
    async subscribe({rootGetters, commit, dispatch}, subscriptionId) {    
        commit('subscribing', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/assinarPlano`, {
                    subscription_id: subscriptionId
                }, {
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
                commit('subscribing', false)
                return { status, message, data }
            }
            commit('subscribing', false)
        } catch (error) {
            commit('subscribing', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao assinar plano", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao assinar plano", data: error }
            }
        }
    },       
}