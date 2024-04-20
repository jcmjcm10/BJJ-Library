<template>
  <q-page class="">
    <div >
      <SearchBar
        @onTxtSearchChange="onTxtSearchChange"
      />
      <q-btn v-if="true" @click="onDebug">Logout</q-btn>
      <div style="display: flex;">
        <p style="margin-left: 10px;">Totales: {{ getNTotalVideosList() }} </p>
        <p style="margin-left: 15px;">Filtrados: {{ getNFiltredVideosList() }}</p>
      </div>
    </div>
    <div style="align-items: center; justify-content: center;">
      <div class="q-pa-md row items-start q-gutter-md">
        <VideoCard 
        v-for="tecnic in tecnicsListFiltred"
        :key="tecnic.id"
        :id="tecnic.id"
        :title="tecnic.title"
        :url="tecnic.url"
        :youtubeID="tecnic.youtubeID"
        @onClickVideo="setAndshowVideo"
        @editVideo="editVideo"
        />
         
        
      </div>
    </div>
    <!--Video dialog-->
    <q-dialog
      v-model="showVideo"
    >
    <q-video
      :src="urlVideo"
      ></q-video>
    </q-dialog>
    <!--Edit video dialog-->
    <q-dialog   v-model="updateVideoPanell">
      <EditVideoCard :id="idVideoEdit"  @closeUpdateVideoPanell="closeUpdateVideoPanell"></EditVideoCard>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import SearchBar from 'src/components/SearchBar.vue'
import VideoCard from 'src/components/VideoCard.vue'
import EditVideoCard from 'src/components/EditVideoCard.vue'
import { useBjjLibraryStore } from 'src/stores/bjj-library'
import { useLoginStore } from 'src/stores/login'

const useBjjLibrary = useBjjLibraryStore()
const useLogin = useLoginStore()

const tecnicsList = computed(() => {return useBjjLibrary.tecnicsList})
const tecnicsListFiltred = ref([])
const updateVideoPanell = ref(false)
const idVideoEdit = ref(null)
export default defineComponent({
  name: 'IndexPage',
  components: {
    SearchBar,
    VideoCard,
    EditVideoCard
  },
  setup(props, context) {
    const txtSearch = ref('')
    const showVideo = ref(false)
    const urlVideo = ref('')
    function onDebug () {
      useLogin.logout()
    }
    
    function onTxtSearchChange (newTxtSearch) {
      filter(newTxtSearch)
    }

    function filter(search) {
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

    function setAndshowVideo (url) {
      urlVideo.value = url;
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
      urlVideo,
      updateVideoPanell,
      idVideoEdit
    }
  }
  
})
</script>
