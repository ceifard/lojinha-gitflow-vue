<template>
    
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/#/">
          <b-icon-cart></b-icon-cart>
          <span class="ml-2">Projeto para Estudos</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!!userToken">

            <b-nav-text class="mr-3">Logado como: {{userEmail}}</b-nav-text>
            
            <b-nav-item right to="/subscription" class="border border-secondary rounded mx-2 px-2">
                Minha assinatura <b-icon-check></b-icon-check>
            </b-nav-item>

            <b-nav-item right to="/stock" class="border border-secondary rounded mx-2 px-2">
                Meu estoque <b-icon-cart></b-icon-cart>
            </b-nav-item>

            <b-nav-item right @click="realizaLogout()">
                Sair <b-icon-arrow-bar-right></b-icon-arrow-bar-right>
            </b-nav-item>

        </b-navbar-nav>
        
        <b-navbar-nav class="ml-auto" v-else>  
            
            <b-nav-item right to="/signup">
                Cadastro
            </b-nav-item>
        
            <b-nav-item right to="/login">
                Login
            </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

</template>

<script>
export default {
    computed: {
        userToken() {
            return this.$store.getters['login/token']
        },
        userEmail() {
            return this.$store.getters['login/email']
        }
    },
    methods: {
        realizaLogout() {
            this.$store.dispatch('login/realizaLogout')
            this.$router.push('/login')
        }
    }
}
</script>