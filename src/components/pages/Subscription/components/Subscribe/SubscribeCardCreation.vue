<template>
    <span>novo cartao</span>
</template>

<script>
export default {
    computed: {
        novoCartao: {
            get() {
                return this.$store.getters['subscription/novoCartao']
            },
            set(value) {
                this.$store.commit('subscription/novoCartao', value)
            }
        },       
    }
}
</script>