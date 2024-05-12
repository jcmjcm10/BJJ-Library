<template>
  <q-page class="">
    <div style="margin-top: 10px;">
      <SearchBar
        @onTxtSearchChange="onTxtSearchChange"
      />
      <div style="display: flex;">
        <p style="margin-left: 10px;">Totales: {{ getNTotalVideosList() }} </p>
        <p style="margin-left: 15px;">Filtrados: {{ getNFiltredVideosList() }}</p>
      </div>
    </div>
    <div class="video-grid">
      <VideoCard 
      v-for="tecnic in pageVideos"
      :key="tecnic.id"
      :video="tecnic"  
      @onClickVideo="setAndshowVideo"
      />        
    </div>
    <!--Video dialog-->
    <q-dialog
      v-model="showVideo"
    >
    <VideoPanel
      :video="selectVideo"
      @editVideo="editVideo"
    ></VideoPanel>
    </q-dialog>
    <!--Edit video dialog-->
    <q-dialog   v-model="updateVideoPanell">
      <EditVideoCard :id="idVideoEdit"  @closeUpdateVideoPanell="closeUpdateVideoPanell"></EditVideoCard>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useBjjLibraryStore } from 'src/stores/bjj-library'

import SearchBar from 'src/components/SearchBar.vue'
import VideoCard from 'src/components/VideoCard.vue'
import EditVideoCard from 'src/components/EditVideoCard.vue'
import VideoPanel from 'src/components/VideoPanel.vue'

const useBjjLibrary = useBjjLibraryStore()

const tecnicsListFiltred = ref([])
const updateVideoPanell = ref(false)
const idVideoEdit = ref(null)

export default defineComponent({
  name: 'IndexPage',
  components: {
    SearchBar,
    VideoCard,
    EditVideoCard,
    VideoPanel
  },
  setup(props, context) {

    // Constantes
    const videosPerPage = 10
    const maxVideosPerPage = 10    

    // Variables
    var firstVideoIndex = 0
    var lastVideoIndex = videosPerPage
    
    
    // Refs
    const txtSearch = ref('')
    const showVideo = ref(false)
    const selectVideo = ref(null)
    const filterForList = ref(false)
    const pageVideos = ref([])

    // Computeds
    const tecnicsList = computed(() => {
      setTimeout(()=> {
        filter('')
      }, 100)
      updateVideoPage()
      if (!filterForList.value) 
      {
        return useBjjLibrary.tecnicsList

      }
      else {
        return useBjjLibrary.getVideosOfListSelected()
      }
      
    })

    function onDebug () {
      useBjjLibrary.updateTechnicalsLists()
    }
    
    function onTxtSearchChange (newTxtSearch) {
      filter(newTxtSearch)
      updateVideoPage()
    }

    function filter(search) {
      if (tecnicsList.value.length == 0) {
        return
      }
      search = search.toLowerCase()
      tecnicsListFiltred.value = []
      if(search == '') {
        tecnicsListFiltred.value = tecnicsList.value
      }
      else {
        
        tecnicsListFiltred.value = filtredByTitle(tecnicsList.value,tecnicsListFiltred.value,search)
        tecnicsListFiltred.value = filtredByV2Tag(tecnicsList.value,tecnicsListFiltred.value,search)
      }
    }

    function filtredByTitle(ori,dest,search) {
      const filterResult = dest
      ori.forEach((tecnic) => {
        if(search === tecnic.title.toLowerCase()) {
          if(!filterResult.find((e) => e.id == tecnic.id)) {
            filterResult.push(tecnic)
          }
        }
      })
      return filterResult
    }

    function filtredByTag(ori,dest,search) {
      const words = search.split(' ')
      const filterResult = dest

      words.forEach(word => {
        ori.forEach((tecnic) => {
          tecnic.tags.forEach((tag) => {
            if(tag.toLowerCase() == word.toLowerCase()) {
              if(!filterResult.find((e) => e.id == tecnic.id)) {
                filterResult.push(tecnic)
              }             
            }
          })
        })
      })
      
      return filterResult
    }

    function filtredByV2Tag(ori,dest,search) {
      const words = search.split(' ').filter((e) => e != '')
      const filterResult = dest
   
      ori.forEach((tecnic) => {
        var accept = true
        words.forEach(word => {
          var containTag = false
          tecnic.tags.forEach((tag) => {
            if(tag.toLowerCase() == word.toLowerCase())
            {
              containTag = true
            }
          })
          if(accept && !containTag)  {
            accept = false
          }
        })
        if(accept) {
            if(!filterResult.find((e) => e.id == tecnic.id)) {
              filterResult.push(tecnic)
            }
          }
      })
      
      return filterResult
    }

    function setAndshowVideo (video) {
      selectVideo.value = video;
      showVideo.value = true;
    }

    function getNTotalVideosList() {
      return tecnicsList.value.length
    }
    
    function getNFiltredVideosList() {
      return tecnicsListFiltred.value.length
    }

    function editVideo (id) {
      idVideoEdit.value = id
      updateVideoPanell.value = true
    }

    function closeUpdateVideoPanell () {
      updateVideoPanell.value = false
    }

    function updateVideoPage () {
      
      if(tecnicsListFiltred.value.length > 0) {
        if (lastVideoIndex >= tecnicsListFiltred.value.length) {
          lastVideoIndex = tecnicsListFiltred.value.length - 1
        }
        pageVideos.value = tecnicsListFiltred.value.slice(firstVideoIndex, lastVideoIndex+1)
      }
    }


    function detectFinalScroll () {
      var element = document.documentElement;

      var totalScroll = element.scrollHeight;
      var topScroll = element.scrollTop;
      var windowHeight = element.clientHeight;

      if (totalScroll - topScroll < windowHeight + 200) {
        lastVideoIndex += videosPerPage
        // if (pageVideos.value.length > maxVideosPerPage) {
        //   firstVideoIndex += videosPerPage
        // }
        updateVideoPage()
      }

    }



    onMounted(()=> {
      
      if (useBjjLibrary.listsSelected.length > 0) {
        filterForList.value = true
      }
      updateVideoPage()
      // Events
      document.addEventListener('scroll', detectFinalScroll)


    })

    return {
      onDebug,
      onTxtSearchChange,
      setAndshowVideo,
      getNTotalVideosList,
      getNFiltredVideosList,
      editVideo,
      closeUpdateVideoPanell,
      showVideo,
      tecnicsListFiltred,
      pageVideos,
      updateVideoPanell,
      idVideoEdit,
      selectVideo
    }
  }
  
})
</script>

<style>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  gap: 0.5em;
  margin: 0px;
  padding: 0 15px 0 15px;
}

</style>