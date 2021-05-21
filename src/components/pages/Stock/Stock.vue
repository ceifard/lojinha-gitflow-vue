<template>
    <b-card no-body>
        <b-tabs card>
            <b-tab title="À venda" active @click="listaEmEstoque()">
                <InStock/>
            </b-tab>
            <b-tab title="Vendidos" @click="listaVendidos()">
                <SoldOut/>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import InStock from './components/InStock.vue'
import SoldOut from './components/SoldOut.vue'
export default {
    components: {
        InStock,
        SoldOut,
    },
    created() {
        this.listaEmEstoque()
    },
    methods: {
        async listaEmEstoque() {
            this.$store.dispatch('products/listaProdutosEmEstoque')
        },
        async listaVendidos() {
            this.$store.dispatch('products/listaProdutosVendidos')
        }
    }    
}
</script>
