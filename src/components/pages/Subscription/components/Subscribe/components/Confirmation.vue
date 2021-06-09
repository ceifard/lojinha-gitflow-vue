<template>
    <div>
        <div>
            {{JSON.stringify(subscriptionConfirmation)}}
        </div>
        <div>
            
        </div>        
    </div>
</template>

<script>
export default {
    async created() {
        let responseCustomer = await this.$store.dispatch('subscription/getCustomer')
        if(responseCustomer.status) this.$store.commit('subscription/subscriptionConfirmationCustomer', responseCustomer.data)
        console.log(this.customerCardList);
    },
    methods: {
        getBrand(brand) {
            return require(`@/assets/img/cards/${brand}.svg`)
        }
    },
    computed: {
        subscriptionConfirmation() {
            return this.$store.getters['subscription/subscriptionConfirmation']
        },             
    }
}
</script>