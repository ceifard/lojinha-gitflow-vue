<template>
    <div>
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
</template>

<script>
export default {
    computed: {
        listaCartoes() {
            return this.$store.getters['subscription/listaCartoes']
        },        
    }
}
</script>