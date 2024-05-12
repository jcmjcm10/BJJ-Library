<template>
  <q-card  @click="onClickVideo()" class="my-card">
    <q-img :src=linkMiniatura>
      <div class="text-h5 absolute-bottom text-right" style="font-size: 20px;">
        {{ video.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
  name: 'VideoCard',
  props: ['video'],
  emits: ['onClickVideo', 'editVideo'],
  setup(props, context) {  
    const linkMiniatura = ref('')
    const videoMenu = ref(null)
    const confirmDeleteDialog = ref(false)
    linkMiniatura.value = `https://img.youtube.com/vi/${props.video.youtubeID}/sddefault.jpg`

    function videoContextMenu () {
      videoMenu.value.show()
    }
   
    function onClickVideo () {
      context.emit('onClickVideo',props.video)
      videoMenu.value.hide()
    }
    
    return {
      linkMiniatura,
      videoMenu,
      videoContextMenu,
      onClickVideo,
      confirmDeleteDialog
      
    }
  }



})

</script>

<style>
.my-card{
  width: 100%;  
}
</style>