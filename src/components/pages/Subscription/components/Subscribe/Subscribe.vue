<template>
  <b-modal :visible="showing"
           centered
           :title="'Assinar plano'"
           hide-footer>

           <div class="mt-3 mb-4">

                <form autocomplete="off" novalidate @submit.prevent="subscribe()" data-vv-scope="formularioAssinatura">

                    <CustomerCreation/>
                    <CardCreation/>

                    <b-form-row class="mt-4">

                        <b-col class="text-right"> 

                            <b-button id="btnAvancar" class="ml-2" :disabled="subscribing" variant="success" type="submit">
                                <span v-if="!subscribing">Assinar <i class="fa fa-check"></i></span>
                                <template v-else>
                                    <span>Assinando</span>
                                    <b-spinner class="ml-2" :style="{ 'margin-bottom': '1px' }" small label="Assinando...aguarde"></b-spinner>            
                                </template>
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
    computed: {
        subscribing() {
            return this.$store.getters['subscription/subscribing']
        }
    },
    methods: {
        async subscribe() {
            this.$validator.validateScopes().then( async success => {    
                if(!success) { //se não passar na validação...
                    window.scrollTo({
                        top: 1,
                        behavior: 'smooth',
                    })
                } else {
                    let newSubscription = this.$store.getters['subscription/newSubscription']
                    await this.$store.dispatch('subscription/subscribe', newSubscription)
                    this.$emit('subscriptionComplete')
                    this.$emit('close')
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