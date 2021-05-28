<template>
  <b-modal :visible="showing"
           centered
           title="Cancelar assinatura"
           hide-footer>

           <div class="text-center mt-3 mb-4">

                <span>
                    Efetuando o cancelamento agora, você terá nosso serviço apenas até {{data_expiracao}}. Deseja mesmo cancelar?
                </span>

           </div>

            <div class="text-right">
                <b-button size="sm" variant="danger" @click="$emit('close')">
                    <i class="fa fa-times"></i> Fechar 
                </b-button>  

                <b-button size="sm" class="mx-2" @click="cancelar()">
                    Cancelar assinatura
                </b-button>                
            </div>

  </b-modal> 
</template>

<script>
export default {  
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
        async cancelar() {
            console.log("cancelando assinatura");
            // await this.$store.dispatch('products/adicionaProduto', this.produto)
            this.$emit('close')
        }
    }
}
</script>