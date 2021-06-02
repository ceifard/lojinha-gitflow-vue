<template>
    <span>novo cliente</span>
</template>

<script>
export default {
    computed: {
        newCard: {
            get() {
                return this.$store.getters['subscription/newCard']
            },
            set(value) {
                this.$store.commit('subscription/newCard', value)
            }
        },       
    }
}
</script>