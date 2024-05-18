<template>
  <q-page class="">
    <h5 style="margin: 10px;">Listas disponibles</h5>
    <div>
      <VideoList
        v-for="technicalList in technicalsLists"
        :key="technicalList.id"
        :id="technicalList.id"
        :title="technicalList.title"
        :technicals="technicalList.videos"
        :owner="technicalList.owner"
      />
    </div>

    <q-btn
      class="float-bottom-right"
      round
      color="primary"
      @click="showAddListDialog = true"
      icon="add"
    />

    <q-dialog v-model="showAddListDialog">
      <q-card style="width: 100%;">
        <q-input class="inputField" outlined v-model="title" label="Title" />        
        
        <q-card-actions align="right">
          <q-btn @click="createList" right>Crear</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'

import { useBjjLibraryStore } from 'stores/bjj-library'

import VideoList from 'src/components/VideoList.vue'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
  name: 'VideoListPage',

  components: {
    VideoList
  },
  setup () {

    const showAddListDialog = ref(false)
    const title = ref('')
    // Computeds
    const technicalsLists = computed(()=> {
      console.log(useBjjLibrary.techniquesLists)
      return useBjjLibrary.techniquesLists
    })
    
    function createList () {
      useBjjLibrary.addList({title: title.value})
    }


    return {
      technicalsLists,
      showAddListDialog,
      title,
      createList,
    }
  }
})
</script>

<style>

.float-bottom-right {
  position: absolute;
  bottom: 20px;
  right: 10px;
}

</style>