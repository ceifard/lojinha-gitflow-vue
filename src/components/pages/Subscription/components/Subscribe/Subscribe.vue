<template>
  <b-modal :visible="showing"
           centered
           title="Nova assinatura"
           hide-footer>

           <div class="text-center mt-3 mb-4">

            <SubscribeCardList v-if="etapa = 0"/>
            <SubscribeCardCreation v-else-if="etapa = 1"/>
            <SubscribeCardConfirmation v-else/>

           </div>

            <div class="text-right">
                <b-button size="sm" variant="danger" @click="$emit('close')">
                    <i class="fa fa-times"></i> Fechar 
                </b-button>  

                <b-button size="sm" class="mx-2" @click="avancar()">
                    Avançar
                </b-button>                
            </div>

  </b-modal> 
</template>

<script>
import SubscribeCardList from './SubscribeCardList.vue'
import SubscribeCardCreation from './SubscribeCardCreation.vue'
import SubscribeCardConfirmation from './SubscribeCardConfirmation.vue'
export default {
    components: {
        SubscribeCardList,
        SubscribeCardCreation,
        SubscribeCardConfirmation,        
    },
    props: {
        showing: Boolean,
        data_expiracao: String,
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
        etapa() {
            return this.$store.getters['subscription/etapa']
        },       
    }
}
</script>