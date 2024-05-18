<template>
  <div style="padding: 0 10px 0 10px;">
    <h5 style="margin-bottom: 0px;">{{ playList.title }}</h5>
    <PlayListItem
      v-for="video in playList.videos"
      :key="video.id"
      :video = video
    >

    </PlayListItem>
  </div>
</template>
  
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useBjjLibraryStore } from 'src/stores/bjj-library'
import PlayListItem from 'src/components/PlayListItem.vue'


export default defineComponent ({
  components: {
    PlayListItem
  },
  setup (props, context) {
      const useBjjLibrary = useBjjLibraryStore()
      const route = useRoute()
      const playList = useBjjLibrary.getPlayList(route.params.id)
      
      onMounted(()=> {
        console.log(playList)
      })

      return {
        playList,
      }

    }
})
      
</script>
<style>



</style>