import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as BJJLIBRARY_API from 'src/API/bjj-library'
import axios from 'axios'
import { useLoginStore } from 'src/stores/login'


export const useBjjLibraryStore = defineStore('bjj-library', () => {
  
  //State
  const useLogin = useLoginStore()
  const tecnicsList = ref([])
  const listsSelected = ref([])
  const techniquesLists = ref([])
  const tagsList = ref([])
  //Actions
  const refreshData = () => {
    BJJLIBRARY_API.getVideos()
      .then(response => {
        if (response.status == 200) {
          tecnicsList.value = response.data.results
        }
      })
    updateTagsList()
    updateTechnicalsLists()
  }
  
  const updateTagsList = () => {
    BJJLIBRARY_API.getTags()
      .then(response => {
        tagsList.value = response.data.results
      })
  }

  const updateTechnicalsLists = () => {
     BJJLIBRARY_API.getVideoLists()
      .then(response => {
        if (response.status == 200) {
          techniquesLists.value = response.data.results
        }
      })
  }
  
  const saveVideo = (requestBody) => {
    BJJLIBRARY_API.addVideo(requestBody)
      .then(response => {
        refreshData()
      })

  } 

  const updateVideo = (requestBody) => {
    BJJLIBRARY_API.updateVideo(requestBody)
    .then(response => {
      refreshData()
    })
  }
  
  const deleteVideo = (pk) => {
    BJJLIBRARY_API.deleteVideo(pk)
    .then(response => {
      refreshData()
    })
  }

  //Getters
  const getVideo = (id) => {
    var result = null
    tecnicsList.value.forEach( video => { //OPT: fer cerca y no recorregut
      console.log(video.id)
      if(video.id === id) {
        result = video
      }
    })
    return result
  }

  const getVideosOfListSelected = () => {
    var result = []
    techniquesLists.value.forEach((list) => {
      if (listsSelected.value.includes(list.id)) {
        result = result.concat(list.videos)
      }
    })
    return result
  }

  //Mutations
  const addTecnicsList = (tecnic) => {
    tecnicsList.value.push(tecnic)
  }
  
  refreshData()
  updateTagsList()

  return {
    tecnicsList,
    tagsList,
    techniquesLists,
    listsSelected,
    updateTagsList,
    saveVideo,
    updateVideo,
    getVideo,
    deleteVideo,
    refreshData,
    updateTechnicalsLists,
    getVideosOfListSelected,
  }

})