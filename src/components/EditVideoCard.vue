<template>
  <q-card style="width:80%;">
    
    <q-card-section>
      <q-toolbar-title>Editar video {{ id }}</q-toolbar-title>
    </q-card-section>

    <q-card-section>
      <q-input class="inputField" outlined v-model="editVideo.title" label="Title" />
      <q-input class="inputField" outlined v-model="editVideo.url" @change="autoFillYoutubeID" label="Url" />
      <q-input class="inputField" outlined v-model="editVideo.youtubeID" label="Youtube ID" />

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
      <q-btn @click="saveVideo" >Editar</q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'



export default defineComponent ({
    name: 'AddVideoCard',
    props:['id'],
    setup (props, context) {
      const useBjjLibrary = useBjjLibraryStore()
      const editVideo = ref({title: '', url: '', youtubeID: '', tags: []})
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
        editVideo.value.tags = tagsSelect.value
        useBjjLibrary.updateVideo(editVideo.value)
        context.emit('closeUpdateVideoPanell')
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

      onMounted(() => {
        editVideo.value = useBjjLibrary.getVideo(props.id)
        editVideo.value.tags.forEach(tag => {
          const filted = tagSelectOptions.value.filter(value => value.label == tag)
          if(filted.length > 0)
          tagsSelect.value.push(filted[0])
        })
      })

      return {
        editVideo,
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