<template>
    <div>
        <div class="cardList" v-if="!!customerCardList.length">
            <b-card
                v-for="(card, index) in customerCardList" :key="index"
                :title="`${card.first_digits}******${card.last_digits}`"
                tag="article"
                class="mb-2"
            >
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div>
                            {{card.holder_name}}
                        </div>
                        <div class="mt-2">
                            <img :src="getBrand(card.brand)" :alt="card.brand" width="40px">
                        </div>                        
                    </div>
                    <div>
                        <b-button variant="primary" @click="useCard(card)">
                            Usar este
                        </b-button>
                    </div>
                </div>

            </b-card>

        </div>
        <div class="noCards text-center" v-else>
            <span>Nenhum cartão encontrado</span>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        let response = await this.$store.dispatch('subscription/getCustomerCards')
        if(response.status) this.$store.commit('subscription/customerCardList', response.data)
        console.log(this.customerCardList);
    },
    methods: {
        getBrand(brand) {
            return require(`@/assets/img/cards/${brand}.svg`)
        },
        useCard(card) {
            this.$store.commit('subscription/subscriptionConfirmationCardId', card.id)
            this.$store.commit('subscription/step', 3)
        },
    },
    computed: {
        customerCardList() {
            return this.$store.getters['subscription/customerCardList']
        },        
    }
}
</script>