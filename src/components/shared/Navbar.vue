<template>
    
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
          <b-icon-cart></b-icon-cart>
          <span class="ml-2">Lojinha para Estudos</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!!userEmail">

            <b-nav-text class="mr-3">Logado como: {{userEmail}}</b-nav-text>
            
            <b-nav-item right>
                <!-- Using 'button-content' slot -->
                Sair <b-icon-arrow-bar-right></b-icon-arrow-bar-right>
            </b-nav-item>

        </b-navbar-nav>
        
        <b-navbar-nav class="ml-auto" v-else>

            <b-nav-item right>
                <!-- Using 'button-content' slot -->
                Cadastro
            </b-nav-item>

            <b-nav-item right>
                <!-- Using 'button-content' slot -->
                Login
            </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

</template>

<script>
export default {
    computed: {
        userEmail() {
            return this.$store.getters.email
        }
    }
}
</script>