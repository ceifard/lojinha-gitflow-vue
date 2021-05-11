<template>
  <div class="pagina">

    <Navbar/>

    <b-container class="py-4">
        <slot></slot>        
    </b-container>

  </div>
</template>

<script>
import Navbar from '@/components/shared/Navbar.vue'
export default {
  components: {
    Navbar,
  }
} 
</script>

<style scoped>
  .pagina {
    overflow: auto;
  }
</style>