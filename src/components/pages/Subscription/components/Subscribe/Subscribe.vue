<template>
  <b-modal :visible="showing"
           centered
           :title="'Assinar plano'"
           hide-footer>

           <div class="mt-3 mb-4">

                <form autocomplete="off" novalidate @submit.prevent="goToConfirmation()" data-vv-scope="formularioAssinatura">

                    <CustomerCreation/>
                    <CardCreation/>

                    <b-form-row class="mt-4">

                        <b-col class="text-right"> 

                            <b-button id="btnAvancar" class="ml-2" variant="success" type="submit">
                                <span>Assinar <i class="fa fa-check"></i></span>
                            </b-button>    

                        </b-col>

                    </b-form-row>                          

                </form>         

           </div>

  </b-modal> 
</template>

<script>
import CustomerCreation from './components/CustomerCreation.vue'
import CardCreation from './components/CardCreation.vue'
export default {
    provide() {
        return { parentValidator: this.$validator };
    }, 
    components: {
        CustomerCreation,
        CardCreation,     
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
        async goToConfirmation() {
            this.$validator.validateScopes().then( async success => {    
                if(!success) { //se não passar na validação...
                    window.scrollTo({
                        top: 1,
                        behavior: 'smooth',
                    })
                } else {
                    console.log(this.errors.has('formularioAssinatura.card_cvv'));
                    console.log("Assinando!");
                }            
            })
            // async goToConfirmation() {
            //     console.log("avançando");
            //     this.step = 1
            //     this.$emit('close')
            // }
        },
    }
}
</script>