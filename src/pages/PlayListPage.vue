<template>
  <div style="padding: 0 10px 0 10px;">
    <h5 style="margin-bottom: 0px;">{{ playList.title }}</h5>
      
    <PlayListItem
      v-for="video in playList.videos"
      :key = video.id
      :video = video
      @onClickVideo="setAndshowVideo"
      @changeOrder="changeOrder"
    >
    </PlayListItem>
    
    <q-dialog
      v-model="showVideo"
    >
      <VideoPanel
        :video="selectVideo"
      ></VideoPanel>
    </q-dialog>
  </div>
</template>
  
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useBjjLibraryStore } from 'src/stores/bjj-library'
import PlayListItem from 'src/components/PlayListItem.vue'
import VideoPanel from 'src/components/VideoPanel.vue'


export default defineComponent ({
  components: {
    PlayListItem,
    VideoPanel,
  },
  setup (props, context) {
      const useBjjLibrary = useBjjLibraryStore()
      const route = useRoute()
      const playList = ref(useBjjLibrary.getPlayList(route.params.id))
      const selectVideo = ref(null)
      const showVideo = ref(false)
      onMounted(()=> {
        console.log(playList)
      })

      function setAndshowVideo (video) {
        selectVideo.value = video;
        showVideo.value = true;
      }

      function changeOrder (up, videoID) {
        // findIndex((list) => list.id == requestBody.list)
        console.log('value', playList.value)
        const videoIndex = playList.value.videos.findIndex((video) => video.id == videoID)
        if (up) {
          if (videoIndex > 0) {
            const aux = playList.value.videos[videoIndex]
            playList.value.videos[videoIndex] = playList.value.videos[videoIndex-1]
            playList.value.videos[videoIndex-1] = aux
          }

        } else {
          if (videoIndex + 1 < playList.value.videos.length) {
            const aux = playList.value.videos[videoIndex]
            playList.value.videos[videoIndex] = playList.value.videos[videoIndex+1]
            playList.value.videos[videoIndex+1] = aux
          }
           
        }
      }

      return {
        playList,
        selectVideo,
        showVideo,
        setAndshowVideo,
        changeOrder,
      }

    }
})
      
</script>
<style>



</style>