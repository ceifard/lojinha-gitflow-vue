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
    async getCustomer({rootGetters, commit, dispatch}) {    
        commit('gettingCustomer', true)
        try {
            let userId = rootGetters['login/id']
            let userToken = rootGetters['login/token']
            let response = await api.get(`planos/buscarCliente/${userId}`, {
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
                commit('gettingCustomer', false)
                return { status, message, data }
            }
            commit('gettingCustomer', false)
        } catch (error) {
            commit('gettingCustomer', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao buscar cliente", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar cliente", data: error }
            }
        }
    },  
    async getCustomerCards({rootGetters, commit, dispatch}) {    
        commit('gettingCustomerCardList', true)
        try {
            let userId = rootGetters['login/id']
            let userToken = rootGetters['login/token']
            let response = await api.get(`planos/buscarCartoesCliente/${userId}`, {
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
                commit('gettingCustomerCardList', false)
                return { status, message, data }
            }
            commit('gettingCustomerCardList', false)
        } catch (error) {
            commit('gettingCustomerCardList', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao buscar cartões do cliente", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar cartões do cliente", data: error }
            }
        }
    },  
    async getCard({rootGetters, commit, dispatch}, cardId) {    
        try {
            let userToken = rootGetters['login/token']
            let response = await api.get(`planos/buscarCartao/${cardId}`, {
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
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao buscar cartão", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar cartão", data: error }
            }
        }
    },  
    async createCard({rootGetters, commit, dispatch}, card) {    
        commit('creatingCard', true)
        try {
            let userId = rootGetters['login/id']
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/criarCartao/${userId}`, card, {
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
                commit('creatingCard', false)
                return { status, message, data }
            }
            commit('creatingCard', false)
        } catch (error) {
            commit('creatingCard', false)
            console.log(error);
            if (error.response) {
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao criar cartão", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao criar cartão", data: error }
            }
        }
    },       
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
                if(error.response.status == 401) dispatch('login/verificaToken', null, {root: true})
                return { ...defaultResponse, message: "Erro ao buscar assinatura", data: error.response }
            } else {
                return { ...defaultResponse, message: "Erro ao buscar assinatura", data: error }
            }
        }
    },    
    async subscribe({rootGetters, commit, dispatch}, subscribeInfo) {    
        commit('subscribing', true)
        try {
            let userToken = rootGetters['login/token']
            let response = await api.post(`planos/assinarPlano`, subscribeInfo, {
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