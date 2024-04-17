<template>
  <q-card style="width:80%;">
    
    <q-card-section>
      <q-toolbar-title>Añadir video</q-toolbar-title>
    </q-card-section>

    <q-card-section>
      <q-input class="inputField" outlined v-model="newVideo.title" label="Title" />
      <q-input class="inputField" outlined v-model="newVideo.url" @change="autoFillYoutubeID" label="Url" />
      <q-input class="inputField" outlined v-model="newVideo.youtubeID" label="Youtube ID" />

      <q-select 
        class="inputField" 
          filled
          v-model="tagsSelect"
          multiple
          :options="tagSelectOptions"
          use-chips
          stack-label
          label="Tags"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn @click="saveVideo" >Añadir</q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'



export default defineComponent ({
    name: 'AddVideoCard',
    props:['videoData'],
    setup (props, context) {
      const useBjjLibrary = useBjjLibraryStore()
      const newVideo = ref({title: '', url: '', youtubeID: '', tags: []})
      const tagsSelect = ref([])
      const tagSelectOptions = computed(() => {
        var result = []
        const tagsList = useBjjLibrary.tagsList
        tagsList.forEach(tag => {
          result.push({label: tag.name, value: tag.id})    
        })
        return result
      })

      function saveVideo () {
        newVideo.value.tags = tagsSelect.value
        useBjjLibrary.saveVideo(newVideo.value)
        context.emit('closeAddVideoPanell')
      }

      function autoFillYoutubeID () {
        var url = newVideo.value.url
        const expresionRegular = /embed\/(.*?)\?/
        const coincidencia = url.match(expresionRegular);
        if (coincidencia && coincidencia[1]) {
          const result = coincidencia[1];
          newVideo.value.youtubeID = result
        }

      }

      return {
        newVideo,
        tagsSelect,
        tagSelectOptions,
        saveVideo,
        autoFillYoutubeID
      }

    }
})
      
</script>
<style>
.inputField {
  margin: 10px
}

</style>