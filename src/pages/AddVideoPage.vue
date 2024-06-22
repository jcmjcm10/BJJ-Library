<template>
  <q-card style="width:100%; max-width: 700px; margin: auto">
    
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
      <q-select 
          filled
          use-chips
          stack-label      
          class="inputField" 
          v-model="listSelected"
          :options="lists"
          label="Lista de Tecnicas"
      />
    </q-card-section>

  
    <!--Vibility-->
    <q-card-section>
      <p>Visibilidad</p>
     
      <q-select 
          v-if="authentication.isStaff"
          class="select-visibility" 
          outlined 
          v-model="visibility"
          :options="visibilityOptions"
          label="Visibilidad"
      >
        <template v-slot:prepend>          
          <svg v-if="visibility == 'public'" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="grey" d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>     
          <svg v-if="visibility == 'private'" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="grey" d="M819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm374-99-58-58q21-37 32.5-77.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v45L261-814q48-31 103-48.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 61-17.5 116T814-261Z"/></svg>
        </template>
      </q-select>

      <q-select 
          v-if="!authentication.isStaff"
          class="select-visibility" 
          dissable
          readonly
          outlined 
          v-model="visibility"
          label="Visibilidad"
          
      >
        <template v-slot:prepend>          
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="grey" d="M819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm374-99-58-58q21-37 32.5-77.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v45L261-814q48-31 103-48.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 61-17.5 116T814-261Z"/></svg>
        </template>
      </q-select>

      <div style="display:flex;">
        <q-icon  name="warning" style="margin-left: 10px; margin-top: 10px; color: gray;"/>
        <p style="color:gray; margin-left: 5px; margin-top: 7px" >Solo los usuarios moderadores puden publicar vidos en publico.</p>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn :disable="uploadingVideo" @click="saveVideo" >Añadir</q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'

import { useBjjLibraryStore } from 'src/stores/bjj-library'
import { useLoginStore } from 'src/stores/login'



export default defineComponent ({
    name: 'AddVideoCard',
    props:['videoData'],
    setup (props, context) {
      const $q = useQuasar()

      const useBjjLibrary = useBjjLibraryStore()
      const useLogin = useLoginStore()
      const newVideo = ref({title: '', url: '', youtubeID: '', tags: [], list: null, visibility: 'private'})
      const tagsSelect = ref([])
      const visibility = ref('private')
      const listSelected = ref(null)
      const visibilityOptions = ref(['private','public'])
      const uploadingVideo = ref(false)
      const authentication = computed(() =>{
        return useLogin.authentication
      } )
      //Computeds
      const lists = computed(() =>{
        var result = []
        const techniquesLists = useBjjLibrary.techniquesLists
        techniquesLists.forEach((list) => {
          result.push({label: list.title, value: list.id})    
        })
        return result
      })
      const tagSelectOptions = computed(() => {
        var result = []
        const tagsList = useBjjLibrary.tagsList
        tagsList.forEach(tag => {
          result.push({label: tag.name, value: tag.id})    
        })
        return result
      })

      function saveVideo () {
        uploadingVideo.value = true
        newVideo.value.tags = tagsSelect.value
        newVideo.value.visibility = visibility.value
        newVideo.value.list = listSelected.value ? parseInt(listSelected.value.value) : null
        useBjjLibrary.saveVideo(newVideo.value)
        .then((response) => {
          if (response.status === 200) {
            $q.notify({
              message: 'Video añadido',
              caption: '',
              color: 'green',
              icon: 'check',
              position: 'top'
            })
          }          
          setTimeout(() => {uploadingVideo.value = false}, 1000)
        })
        .catch((response) => {
          $q.notify({
              message: 'Error al subir el video',
              caption: '',
              color: 'red',
              icon: 'close',
              position: 'top'
            })
          setTimeout(() => {uploadingVideo.value = false}, 1000)
        })
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
        visibility,
        visibilityOptions,
        lists,
        listSelected,
        authentication,
        uploadingVideo,
        saveVideo,
        autoFillYoutubeID
      }

    }
})
      
</script>
<style>



</style>