<template>
  <div id="app">
    <Template>
      <router-view/>
    </Template>
  </div>
</template>

<script>
import Template from '@/components/shared/Template.vue'
export default {
  components: {
    Template
  }
} 
</script>

<style>
#app {
  min-height: 100vh;
  background-color: rgb(233, 232, 232);
}
</style>