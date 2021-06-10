<template>
    <div>
        <div class="text-center" v-if="loadingInformation">
            <b-spinner label="Carregando informações"></b-spinner>
        </div>
        <div v-else>
            <h6 class="mb-3">
                Verifique se todas as informações abaixo estão corretas:
            </h6>
            <b-card>
                <b-row class="mt-2">
                    <b-col>
                        Cartão utilizado:
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        {{`${selectedCard.first_digits}******${selectedCard.last_digits}`}} 
                        <img class="ml-2" :src="getBrand(selectedCard.brand)" :alt="selectedCard.brand" width="40px">
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col>
                        Assinatura:
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        <span>
                            R$ 300,00 por mês
                        </span>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-center">
                        <span class="font-weight-bold">Atenção: A assinatura é recorrente, mas você pode cancelar quando quiser!</span>
                    </b-col>
                </b-row>
            </b-card>

            <b-row class="mt-4">
                <b-col class="text-right">
                    <b-button variant="success" @click="confirmSubscription()">
                        Confirmar assinatura
                    </b-button>                    
                </b-col>
            </b-row>

        </div>     
    </div>
</template>

<script>
export default {
    async created() {
        this.loadingInformation = true
        let responseCustomer = await this.$store.dispatch('subscription/getCustomer')
        if(responseCustomer.status) this.$store.commit('subscription/subscriptionConfirmationCustomer', responseCustomer.data)
        let responseCard = await this.$store.dispatch('subscription/getCard', this.subscriptionConfirmation.card_id)
        this.selectedCard = responseCard.data
        this.loadingInformation = false
    },
    data() {
        return {
            loadingInformation: false,
            selectedCard: {}
        }
    },
    methods: {
        getBrand(brand) {
            return require(`@/assets/img/cards/${brand}.svg`)
        },
        async confirmSubscription() {
            await this.$store.dispatch('subscription/subscribe', this.subscriptionConfirmation)
            this.$emit('subscriptionComplete')
        }
    },
    computed: {
        subscriptionConfirmation() {
            return this.$store.getters['subscription/subscriptionConfirmation']
        },             
    }
}
</script>