<template>
  <div>
    <router-view />
    <h1>Hola</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted() {
    console.log('---EMPIEZA EL PROGRAMA---')

  }
})



</script>
