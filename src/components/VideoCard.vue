<template>
  <q-btn @click="onClickVideo()" flat class="my-card">    
    <q-card class="my-card" @contextmenu.prevent="videoContextMenu">
      <q-menu ref="videoMenu">
        <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="editVideo">Editar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="confirmDeleteDialog=true">Eliminar</q-item-section>
            </q-item>
        </q-list>
      </q-menu>
      <q-img :src=linkMiniatura>
        <div class="text-h5 absolute-bottom text-right" style="font-size: 20px;">
          {{ title }}
        </div>
      </q-img>
    </q-card>
  </q-btn>  
  <q-dialog v-model="confirmDeleteDialog">
    <q-card style="padding: 40px;">
      ¿Seguro que quieres eliminar-lo?
      <q-btn v-close-popup @click="deleteVideo" style="margin-left: 10px;">Si</q-btn>
      <q-btn v-close-popup style="margin-left: 10px;">No</q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
  name: 'VideoCard',
  props: ['id','title','url','youtubeID'],
  emits: ['onClickVideo', 'editVideo'],
  setup(props, context) {  
    const linkMiniatura = ref('')
    const videoMenu = ref(null)
    const confirmDeleteDialog = ref(false)
    linkMiniatura.value = `https://img.youtube.com/vi/${props.youtubeID}/sddefault.jpg`

    function videoContextMenu () {
      console.log(videoMenu.value)
      videoMenu.value.show()
    }

    function editVideo () {
      context.emit('editVideo', props.id)
    }

    function deleteVideo () {
      useBjjLibrary.deleteVideo(props.id)
    }

    function onClickVideo () {
      context.emit('onClickVideo',props.url)
      videoMenu.value.hide()

    }

    return {
      linkMiniatura,
      videoMenu,
      videoContextMenu,
      editVideo,
      deleteVideo,
      onClickVideo,
      confirmDeleteDialog
      
    }
  }



})

</script>

<style>
.my-card{
  width: 100%;
  max-width: 350px;
}
</style>