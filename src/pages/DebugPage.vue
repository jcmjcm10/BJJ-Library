<template>
     <q-page class="">
        <h5 style="margin: 10px;">Debug</h5>
            <textarea v-model="inputText"></textarea>
     </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'



export default defineComponent ({
    name: 'VideoPanel',
    props:[],
    setup (props, context) {

        const inputText = ref('')


        return {
            inputText
        }
    }
})
    
</script>
<style>

</style>