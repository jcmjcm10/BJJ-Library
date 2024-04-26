<template>
  <q-page class="">
    <h5 style="margin: 10px;">Listas disponibles</h5>
    <div>
      <TechnicalItem
        v-for="technicalList in technicalsLists"
        :key="technicalList.id"
        :id="technicalList.id"
        :title="technicalList.title"
        :technicals="technicalList.videos"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'

import { useBjjLibraryStore } from 'stores/bjj-library'

import TechnicalItem from 'src/components/TechnicalItem.vue'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
  name: 'VideoListPage',

  components: {
    TechnicalItem
  },
  setup () {

    const technicalsLists = computed(()=> {
      console.log(useBjjLibrary.techniquesLists)
      return useBjjLibrary.techniquesLists
    })
      

    return {
      technicalsLists
    }
  }
})
</script>
