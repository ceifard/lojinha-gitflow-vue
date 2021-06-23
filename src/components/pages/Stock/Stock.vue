<template>
    <b-card no-body>
        <div class="m-4 text-center text-secondary" v-if="loadingSubscription">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>Carregando...</strong>
        </div>     
        <template v-else>
            <b-tabs card v-if="(subscription.status == 2 || subscription.status == 0)">
                <b-tab title="À venda" active @click="listaEmEstoque()">
                    <InStock/>
                </b-tab>
                <b-tab title="Vendidos" @click="listaVendidos()">
                    <SoldOut/>
                </b-tab>        
            </b-tabs>
            <template v-else>
                <b-alert show variant="danger" class="mx-1 my-1 text-center">
                    Não encontramos nenhuma assinatura ativa :( se deseja gerenciar sua assinatura, clique <router-link :to="'/subscription'">aqui</router-link>
                </b-alert>
            </template>
        </template>       
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
    data() {
        return {
            loadingSubscription: false,
        }
    },    
    async created() {
        await this.validateSubscription()
        this.listaEmEstoque()
    },
    computed: {
        subscription: {
            get() {
                return this.$store.getters['subscription/userSubscription']
            },
            set(val) {
                this.$store.commit('subscription/userSubscription', val)
            }
        },
    },    
    methods: {
        async validateSubscription() {
            this.loadingSubscription = true
            let {
                data: subscription
            } = await this.$store.dispatch('subscription/validateSubscription')
            this.subscription = subscription
            this.loadingSubscription = false
        },        
        async listaEmEstoque() {
            this.$store.dispatch('products/listaProdutosEmEstoque')
        },
        async listaVendidos() {
            this.$store.dispatch('products/listaProdutosVendidos')
        }
    }    
}
</script>
