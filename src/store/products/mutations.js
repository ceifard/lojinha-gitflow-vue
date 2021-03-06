import {getDefaultState} from './defaultState'
export const mutations = {
    resetState: (state, obj) => Object.assign(state, getDefaultState()),    
    carregandoProdutosEmEstoque: (state, obj) => state.carregandoProdutosEmEstoque = obj,
    listagemProdutosEmEstoque: (state, obj) => state.listagemProdutosEmEstoque = obj,
    carregandoProdutosVendidos: (state, obj) => state.carregandoProdutosVendidos = obj,
    listagemProdutosVendidos: (state, obj) => state.listagemProdutosVendidos = obj,
}