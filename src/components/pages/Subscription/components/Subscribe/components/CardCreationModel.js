export let Model = {
    computed: {
        card_number: {
            get() {
                return this.$store.getters['subscription/card_number']
            },
            set(value) {
                this.$store.commit('subscription/card_number', value)
            }
        }, 
        card_holder_name: {
            get() {
                return this.$store.getters['subscription/card_holder_name']
            },
            set(value) {
                this.$store.commit('subscription/card_holder_name', value.toUpperCase())
            }
        }, 
        card_expiration_date: {
            get() {
                return this.$store.getters['subscription/card_expiration_date']
            },
            set(value) {
                this.$store.commit('subscription/card_expiration_date', value)
            }
        }, 
        card_cvv: {
            get() {
                return this.$store.getters['subscription/card_cvv']
            },
            set(value) {
                this.$store.commit('subscription/card_cvv', value)
            }
        }, 
    }
}