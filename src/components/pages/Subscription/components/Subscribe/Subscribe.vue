<template>
  <b-modal :visible="showing"
           centered
           title="Nova assinatura"
           hide-footer>

           <div class="mt-3 mb-4">

            <CustomerCreation v-if="step == 0"/>
            <CardList v-else-if="step == 1"/>
            <CardCreation v-else-if="step == 2"/>
            <CardConfirmation v-else-if="step == 3"/>

           </div>

  </b-modal> 
</template>

<script>
import CustomerCreation from './components/CustomerCreation.vue'
import CardList from './components/CardList.vue'
import CardCreation from './components/CardCreation.vue'
import Confirmation from './components/Confirmation.vue'
export default {
    components: {
        CustomerCreation,
        CardList,
        CardCreation,
        Confirmation,        
    },
    props: {
        showing: Boolean,
        data_expiracao: String,
    },
    async created() {
        let customerCardResponse = await this.$store.dispatch('subscription/getCustomerCards')
        if(customerCardResponse.status) {
            this.$store.commit('subscription/step', 1)        
            this.$store.commit('subscription/customerCardList', customerCardResponse.data)        
        }
    },
    async mounted() {
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            this.$emit('close')
        })   
    },
    methods: {
        async avancar() {
            console.log("avançando");
            // await this.$store.dispatch('products/adicionaProduto', this.produto)
            this.$emit('close')
        }
    },
    computed: {
        step() {
            return this.$store.getters['subscription/step']
        },       
    }
}
</script>