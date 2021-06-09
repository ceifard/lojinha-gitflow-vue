<template>
    <div>
        <div class="cardList" v-if="!!customerCardList.length">
            <b-card
                title="Card Title"
                tag="article"
                class="mb-2"
            >
                <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>

        </div>
        <div class="noCards text-center">
            <span>Nenhum cartão encontrado</span>
        </div>
    </div>
</template>

<script>
export default {
    // async created() {
    //     await this.$store.dispatch('subscription/getCustomerCards')
    //     console.log(this.customerCardList);
    // },
    computed: {
        customerCardList() {
            return this.$store.getters['subscription/customerCardList']
        },        
    }
}
</script>